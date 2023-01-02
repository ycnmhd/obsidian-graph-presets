/* 
	Based on https://github.com/RafaelGB/obsidian-db-folder/blob/91f08085da0c71276407f034775f892497f661a2/src/DatabaseView.tsx
*/
import { TextFileView, WorkspaceLeaf, TFile, Menu } from "obsidian";
import { createRoot, Root } from "react-dom/client";
import { logger } from "../../helpers/logger";
import { ViewManager } from "./view-manager";
import { IView, StateManager } from "./state-manager";
import { PresetPreview } from "./components/preset-preview/preset-preview";
import { t } from "src/graph-presets/lang/text";
import { GetPresetDTO } from "src/graph-presets/actions/get-preset";

const isPresetNote = (data: string) => {
	return /---\sgraph-presets-plugin: basic\s---/.test(data);
};

export const PresetViewType = "markdown-preset-view";

export class PresetView extends TextFileView implements IView {
	private manager: ViewManager<PresetView>;
	private container: HTMLDivElement | null = null;
	private rootContainer: Root | null = null;
	private actionButtons: Record<string, HTMLElement> = {};

	constructor(
		leaf: WorkspaceLeaf,
		manager: ViewManager<PresetView>,
		file?: TFile
	) {
		super(leaf);
		this.manager = manager;
		if (file) {
			this.file = file;
			this.manager.removeView(this);
			this.manager.addView(this, this.data);
		} else {
			this.register(
				this.containerEl.onWindowMigrated(() => {
					this.manager.removeView(this);
					this.manager.addView(this, this.data);
				})
			);
		}
	}

	setViewData(data: string): void {
		if (!isPresetNote(data)) {
			this.manager.setLeafType({
				leaf: this.leaf,
				type: "markdown",
				setState: true,
			});

			return;
		} else {
			this.manager.setLeafType({
				leaf: this.leaf,
				type: PresetViewType,
				setState: true,
			});
		}

		this.manager.addView(this, data);
	}

	getViewType(): string {
		return PresetViewType;
	}

	getStateManager(): StateManager<PresetView> | undefined {
		return this.manager.getStateManager(this.file);
	}
	get id(): string {
		return `${(this.leaf as any).id}:::${this.file?.path}`;
	}

	get isPrimary(): boolean {
		return this.manager.getStateManager(this.file)?.getAView() === this;
	}

	getPresetMeta(): GetPresetDTO {
		return {
			created: this.file.stat.ctime,
			file: this.file,
		};
	}

	getWindow() {
		return this.containerEl.win as Window & typeof globalThis;
	}

	onPaneMenu(menu: Menu, source: string, callSuper = true): void {
		if (source !== "more-options") {
			super.onPaneMenu(menu, source);
			return;
		}
		menu.addItem((item) => {
			item.setTitle("Open as Markdown")
				.setIcon("document")
				.onClick(this.markdownAction.bind(this));
		}).addSeparator();

		if (callSuper) {
			super.onPaneMenu(menu, source);
		}
	}

	async render(): Promise<void> {
		if (this.rootContainer) {
			try {
				if (this.contentEl) {
					this.contentEl.style.setProperty(
						"background-color",
						"var(--background-modifier-cover)"
					);
				}
				if (this.container) {
					this.container.style.setProperty("height", "100%");
				}
				const view = (
					<div className="flex justify-center items-center h-full ">
						<PresetPreview ctime={this.file.stat.ctime} />
					</div>
				);
				this.rootContainer.render(view);
			} catch (e) {
				logger.error(e);
				setTimeout(() => {
					this.manager.setLeafType({
						leaf: this.leaf,
						type: "markdown",
						setState: true,
						focus: true,
					});
				});
			}
		}
	}

	private initActions(): void {
		// Open as markdown action
		this.addAction(
			"document",
			t.c.OPEN_AS_MARKDOWN,
			this.markdownAction.bind(this)
		);
	}

	postRenderActions(): void {}

	onload(): void {
		super.onload();
		this.initActions();
	}

	async destroy() {
		// Remove draggables from render, as the DOM has already detached
		const manager = this.getStateManager();
		if (manager) manager.unregisterView(this);
		this.manager.removeView(this);
		if (this.container) this.container.remove();
		this.detachViewComponents();
	}

	async onClose() {
		this.destroy();
	}

	async onUnloadFile(file: TFile) {
		this.destroy();
		return await super.onUnloadFile(file);
	}

	initRootContainer(file: TFile) {
		this.container = this.contentEl.createDiv("container");
		this.container.setAttribute("id", file.path);
		this.rootContainer = createRoot(this.container);
	}

	async onLoadFile(file: TFile) {
		try {
			this.initRootContainer(file);
			return await super.onLoadFile(file);
		} catch (e) {
			logger.error(e);
		}
	}

	async reload() {
		if (this.rootContainer) {
			this.rootContainer.unmount();
			if (this.container) {
				this.rootContainer = createRoot(this.container);
				this.detachViewComponents();
				await this.render();
			}
		}
	}

	detachViewComponents(): void {
		Object.values(this.actionButtons).forEach((button) => {
			button.detach();
		});
		this.actionButtons = {};

		if (this.manager.statusBarItem) {
			this.manager.statusBarItem.detach();
			this.manager.statusBarItem = null;
		}
	}

	markdownAction(): void {
		this.manager.setLeafType({
			leaf: this.leaf,
			type: "markdown",
			setState: true,
		});
	}

	clear(): void {}

	getViewData(): string {
		return this.data;
	}
}
