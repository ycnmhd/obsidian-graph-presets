import { addIcon, Plugin, TFile, TFolder } from "obsidian";
import { applyGraphPreset } from "./commands/apply-graph-preset";
import { openGraphPresetsView } from "./commands/open-graph-presets-view";
import {
	GraphPresetsItemView,
	GraphPresetsItemViewIcon,
	GraphPresetsItemViewType,
} from "./components/presets-view/graph-presets-item-view";
import { fileIsPreset } from "./helpers/file-is-preset";
import { mergeDeep } from "./helpers/merge-deep";
import { Store } from "./helpers/store";
import { applyMarkdownPresetPatch } from "./monkey-patches/apply-markdown-preset/apply-markdown-preset";
import { createMarkdownPresetPatch } from "./monkey-patches/create-markdown-preset/create-markdown-preset-patch";
import { updateMarkdownPresetPatch } from "./monkey-patches/update-markdown-preset/update-markdown-preset-patch";
import {
	DEFAULT_SETTINGS,
	GraphPresetsSettings,
} from "./settings/default-settings";

export class GraphPresets extends Plugin {
	private static instance: GraphPresets;
	public static getInstance(): GraphPresets {
		return this.instance;
	}
	store: Store<GraphPresetsSettings> = new Store();

	settings: GraphPresetsSettings;

	async onload() {
		GraphPresets.instance = this;
		await this.loadSettings();
		this.addCommand(openGraphPresetsView);
		this.loadPresetCommands();
		addIcon(GraphPresetsItemViewIcon.name, GraphPresetsItemViewIcon.svg);

		this.registerView(
			GraphPresetsItemViewType,
			(leaf) => new GraphPresetsItemView(leaf)
		);
		app.workspace.onLayoutReady(this.initView);

		// inspired from https://github.com/zsviczian/obsidian-excalidraw-plugin/blob/da89e32213be8cb21ec8e0705ab5d5f8bcbac3dc/src/main.ts#L259
		this.registerMonkeyPatches();
	}

	onunload() {}

	async loadSettings() {
		this.settings = mergeDeep(await this.loadData(), DEFAULT_SETTINGS);
		this.store.set(this.settings);
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.store.set(this.settings);
		this.loadPresetCommands();
	}

	loadPresetCommands() {
		applyGraphPreset().forEach((command) => {
			this.addCommand(command);
		});
	}

	private initView = async (): Promise<void> => {
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
	};

	private registerMonkeyPatches() {
		this.registerEvent(
			app.workspace.on("file-menu", async (menu, file, source) => {
				if (source === "more-options") {
					if (fileIsPreset(file)) {
						applyMarkdownPresetPatch(menu, file as TFile);
						updateMarkdownPresetPatch(menu, file);
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
	}
}
