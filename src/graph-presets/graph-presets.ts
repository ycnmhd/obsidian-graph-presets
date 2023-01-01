import { addIcon, Plugin, TFile, TFolder, WorkspaceLeaf } from "obsidian";
import { applyGraphPreset } from "./commands/apply-graph-preset";
import { openGraphPresetsView } from "./commands/open-graph-presets-view";
import {
	GraphPresetsItemView,
	GraphPresetsItemViewIcon,
	GraphPresetsItemViewType,
} from "./components/presets-view/graph-presets-item-view";
import { fileIsPreset, fileIsPresetAsync } from "./helpers/file-is-preset";
import { mergeDeep } from "./helpers/merge-deep";
import { Store } from "./helpers/store";
import { applyMarkdownPresetPatch } from "./monkey-patches/apply-markdown-preset/apply-markdown-preset-patch";
import { createMarkdownPresetPatch } from "./monkey-patches/create-markdown-preset-patch";
import { updateMarkdownPresetPatch } from "./monkey-patches/update-markdown-preset-patch";
import { DEFAULT_SETTINGS, PluginSettings } from "./settings/default-settings";
import { PresetView, PresetViewType } from "./views/preset/preset-view";
import { ViewManager } from "./views/preset/view-manager";
import { FRONTMATTER_KEY } from "./helpers/constants";
import { around } from "monkey-around";
import { renderLeafAsPreset } from "./monkey-patches/render-leaf-as-preset";
export type MarkdownPresetMeta = {
	applied: number;
	created: number;
	updated: number;
	name: string;
	path: string;
};

export type PluginState = {
	meta: Record<number, MarkdownPresetMeta>;
	filesByCtime: Record<string, TFile>;
	filesByPath: Record<string, TFile>;
};

export class GraphPresets extends Plugin {
	private static instance: GraphPresets;
	public static getInstance(): GraphPresets {
		return this.instance;
	}
	viewManager: ViewManager<PresetView> = new ViewManager(
		this.registerEvent.bind(this),
		PresetViewType,
		FRONTMATTER_KEY
	);
	store: Store<{
		settings: PluginSettings;
		state: PluginState;
	}> = new Store();

	settings: PluginSettings;

	async onload() {
		GraphPresets.instance = this;

		await this.loadSettings();
		await this.loadMarkdownPresetsMeta();
		this.viewManager.onload();
		this.addCommand(openGraphPresetsView);
		this.loadPresetCommands();
		addIcon(GraphPresetsItemViewIcon.name, GraphPresetsItemViewIcon.svg);

		this.registerView(
			GraphPresetsItemViewType,
			(leaf) => new GraphPresetsItemView(leaf)
		);
		this.registerView(
			PresetViewType,
			(leaf) => new PresetView(leaf, this.viewManager)
		);
		app.workspace.onLayoutReady(this.initView);
		// inspired from https://github.com/zsviczian/obsidian-excalidraw-plugin/blob/da89e32213be8cb21ec8e0705ab5d5f8bcbac3dc/src/main.ts#L259
		this.registerMonkeyPatches();
	}

	onunload(): void {
		return this.viewManager.onunload();
	}

	async loadSettings() {
		this.settings = mergeDeep(
			(await this.loadData()) || {},
			DEFAULT_SETTINGS
		);
		this.store.set({ settings: this.settings });
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.store.set({ settings: { ...this.settings } });
	}

	loadPresetCommands() {
		applyGraphPreset().forEach((command) => {
			this.addCommand(command);
		});
	}

	private async initView(): Promise<void> {
		const leafs = app.workspace.getLeavesOfType(GraphPresetsItemViewType);
		await Promise.all(
			leafs
				.filter((leaf) => !(leaf.view instanceof GraphPresetsItemView))
				.map(async (leaf) => {
					return await leaf.setViewState({ type: "empty" });
				})
		);
		const leaf = leafs.at(-1) || app.workspace.getLeftLeaf(false);
		leaf.setViewState({
			type: GraphPresetsItemViewType,
			active: true,
		});
	}

	private registerMonkeyPatches() {
		this.registerEvent(
			app.workspace.on("file-menu", async (menu, file, source, leaf) => {
				if (source === "more-options") {
					if (fileIsPreset(file)) {
						applyMarkdownPresetPatch(menu, file as TFile);
						updateMarkdownPresetPatch(menu, file);
						renderLeafAsPreset(menu, leaf as WorkspaceLeaf);
					}
				} else if (source === "file-explorer-context-menu") {
					if (fileIsPreset(file)) {
						applyMarkdownPresetPatch(menu, file as TFile);
						updateMarkdownPresetPatch(menu, file);
					} else if (file instanceof TFolder)
						await createMarkdownPresetPatch(menu, file);
				}
			})
		);

		["create", "modify", "delete", "rename"].forEach((event) => {
			this.registerEvent(
				app.vault.on(event as any, async (file) => {
					let isPreset;
					if (event === "delete") {
						if (file instanceof TFile) {
							isPreset =
								!!this.store.getSnapshot().state.meta[
									file.stat.ctime
								];
						}
					} else {
						isPreset = await fileIsPresetAsync(file);
					}
					if (isPreset) {
						this.loadMarkdownPresetsMeta();
					}
				})
			);
		});

		this.register(
			around(WorkspaceLeaf.prototype, this.viewManager.patch())
		);
	}

	loadMarkdownPresetsMeta(): void {
		const persistedMeta = this.settings.data.presetsMeta;
		const mdFiles = app.vault.getMarkdownFiles().filter((f) => {
			return fileIsPreset(f);
		});
		const meta = Object.fromEntries(
			mdFiles.map((f) => {
				return [
					f.stat.ctime,
					{
						applied:
							persistedMeta[f.stat.ctime]?.meta?.applied || 0,
						created: f.stat.ctime,
						updated: f.stat.mtime,
						name: f.basename,
						path: f.path,
					} as MarkdownPresetMeta,
				];
			})
		);
		const filesByCtime = Object.fromEntries(
			mdFiles.map((f) => {
				return [f.stat.ctime, f];
			})
		);
		const filesByPath = Object.fromEntries(
			mdFiles.map((f) => {
				return [f.path, f];
			})
		);
		this.store.set({
			state: {
				meta,
				filesByCtime,
				filesByPath,
			},
		});
	}
}
