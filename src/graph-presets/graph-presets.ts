import { addIcon, Plugin } from "obsidian";
import { applyGraphPreset } from "./commands/apply-graph-preset";
import { openGraphPresetsView } from "./commands/open-graph-presets-view";
import {
	GraphPresetsItemView,
	GraphPresetsItemViewIcon,
	GraphPresetsItemViewType,
} from "./components/presets-view/graph-presets-item-view";
import { Store } from "./helpers/store";
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
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
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
}
