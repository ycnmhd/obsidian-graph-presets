/* 
	Based on https://github.com/RafaelGB/obsidian-db-folder/blob/91f08085da0c71276407f034775f892497f661a2/src/main.ts#L46
*/
import { TFile, ViewState, WorkspaceLeaf } from "obsidian";
import { unmountComponentAtNode } from "react-dom";
import { IView, StateManager } from "./state-manager";

interface WindowRegistry<View extends IView> {
	viewMap: Map<string, View>;
	viewStateReceivers: Array<(views: View[]) => void>;
	appRoot: HTMLElement;
}

const getLeafId = (leaf: WorkspaceLeaf) => {
	return [
		(leaf as any).id,
		((leaf.view as any).file as TFile)
			? (leaf.view as any).file.stat.ctime
			: leaf.view.getDisplayText(),
	].join(":::");
};

export class ViewManager<View extends IView> {
	private leafTypeMap: Record<string, string> = {};

	viewMap: Map<string, View> = new Map();

	stateManagers: Map<TFile, StateManager<View>> = new Map();

	windowRegistry: Map<Window, WindowRegistry<View>> = new Map();

	ribbonIcon: HTMLElement;

	statusBarItem: HTMLElement | null = null;
	constructor(
		private registerEvent: any,
		private viewType: string,
		private frontmatter: string
	) {}

	onload() {
		this.registerEvent(
			app.workspace.on("window-open", (_: any, win: Window) => {
				this.mount(win);
			})
		);

		this.registerEvent(
			app.workspace.on("window-close", (_: any, win: Window) => {
				this.unmount(win);
			})
		);
		this.mount(window);
	}

	mount(win: Window) {
		if (this.windowRegistry.has(win)) {
			return;
		}

		const el = win.document.body.createDiv();

		this.windowRegistry.set(win, {
			viewMap: new Map(),
			viewStateReceivers: [],
			appRoot: el,
		});
	}
	getView(id: string, win: Window) {
		const reg = this.windowRegistry.get(win);

		if (reg?.viewMap.has(id)) {
			return reg.viewMap.get(id);
		}

		for (const reg of this.windowRegistry.values()) {
			if (reg.viewMap.has(id)) {
				return reg.viewMap.get(id);
			}
		}

		return null;
	}

	async setView(leaf: WorkspaceLeaf) {
		await leaf.setViewState({
			type: this.viewType,
			state: leaf.view.getState(),
			popstate: true,
		} as ViewState);
	}

	viewStateReceivers: Array<(views: View[]) => void> = [];

	addView(view: View, data: string) {
		const win = view.getWindow();
		const reg = this.windowRegistry.get(win);

		if (!reg) {
			return;
		}

		if (!this.viewMap.has(view.id)) {
			this.viewMap.set(view.id, view);
		}

		const file = view.file;
		if (this.stateManagers.has(file)) {
			(this.stateManagers.get(file) as StateManager<View>).registerView(
				view
			);
		} else {
			this.stateManagers.set(
				file,
				new StateManager(view, () => this.stateManagers.delete(file))
			);
		}
		reg.viewStateReceivers.forEach((fn) => fn(this.getViews(win)));
	}

	getStateManager(file: TFile) {
		return this.stateManagers.get(file);
	}

	getStateManagerFromViewID(id: string, win: Window) {
		const view = this.getView(id, win);

		if (!view) {
			return null;
		}

		return this.stateManagers.get(view.file);
	}
	getViews(win: Window) {
		const reg = this.windowRegistry.get(win);

		if (reg) {
			return Array.from(reg.viewMap.values());
		}

		return [];
	}
	removeView(view: View) {
		const entry = Array.from(this.windowRegistry.entries()).find(
			([, reg]) => {
				return reg.viewMap.has(view.id);
			},
			[]
		);

		if (!entry) {
			return;
		}

		const [win, reg] = entry;
		const file = view.file;

		if (reg.viewMap.has(view.id)) {
			reg.viewMap.delete(view.id);
		}

		if (this.stateManagers.has(file)) {
			const state = this.stateManagers.get(file);
			if (state) state.unregisterView(view);
			reg.viewStateReceivers.forEach((fn) => fn(this.getViews(win)));
		}
	}

	unmount(win: Window) {
		const reg = this.windowRegistry.get(win);
		if (!reg) return;

		for (const view of reg.viewMap.values()) {
			view.destroy();
		}

		unmountComponentAtNode(reg.appRoot);

		reg.appRoot.remove();
		reg.viewMap.clear();
		reg.viewStateReceivers.length = 0;
		reg.appRoot = null as any;

		this.windowRegistry.delete(win);
	}

	unload(): void {
		Promise.all(
			app.workspace.getLeavesOfType(this.viewType).map((leaf) => {
				this.setLeafType({
					leaf,
					type: "markdown",
				});
			})
		);
	}

	onunload() {
		this.windowRegistry.forEach((reg, win) => {
			reg.viewStateReceivers.forEach((fn) => fn([]));
			this.unmount(win);
		});
		this.unmount(window);
		this.stateManagers.clear();
		this.windowRegistry.clear();
		this.resetLeafTypes();
		(app.workspace as any).unregisterHoverLinkSource(this.viewType);
	}

	patch = () => {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;
		return {
			setViewState(next: any) {
				return function (state: ViewState, ...rest: any[]) {
					if (
						state.type === "markdown" &&
						state.state?.file &&
						self.getLeafType(this) !== "markdown"
					) {
						const cache = app.metadataCache.getCache(
							state.state.file
						);
						this.set;

						if (
							cache?.frontmatter &&
							cache.frontmatter[self.frontmatter]
						) {
							const newState = {
								...state,
								type: self.viewType,
							};
							self.setLeafType({
								leaf: this,
								type: self.viewType,
							});

							return next.apply(this, [newState, ...rest]);
						}
					}

					return next.apply(this, [state, ...rest]);
				};
			},
		};
	};

	public getLeafType(leaf: WorkspaceLeaf): string | undefined {
		return this.leafTypeMap[getLeafId(leaf)];
	}

	public async setLeafType({
		leaf,
		type,
		focus,
		setState,
	}: {
		leaf: WorkspaceLeaf;
		type: string;
		setState?: boolean;
		focus?: boolean;
	}) {
		this.leafTypeMap[getLeafId(leaf)] = type;

		if (setState)
			await leaf.setViewState(
				{
					type: type,
					state: leaf.view.getState(),
					popstate: true,
				} as ViewState,
				{ focus }
			);
	}

	private resetLeafTypes() {
		this.leafTypeMap = {};
	}
}
