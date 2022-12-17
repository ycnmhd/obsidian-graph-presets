import { addIcon, Plugin } from "obsidian";
import { svgs } from "src/assets/svgs";
import { applyGraphPreset } from "./commands/apply-graph-preset";
import { openGraphPresetsModal } from "./commands/open-graph-presets-modal";
import {
	DEFAULT_SETTINGS,
	GraphPresetsSettings,
} from "./settings/default-settings";

export class GraphPresets extends Plugin {
	private static instance: GraphPresets;
	public static getInstance(): GraphPresets {
		return this.instance;
	}

	settings: GraphPresetsSettings;

	async onload() {
		GraphPresets.instance = this;
		await this.loadSettings();

		this.addCommand(openGraphPresetsModal);
		this.loadPresetCommands();
		addIcon("graph-presets", svgs["graph-presets"]);
		this.addRibbonIcon("graph-presets", "Graph presets", () => {
			const callback = openGraphPresetsModal.callback as () => void;
			callback();
		});
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.loadPresetCommands();
	}

	loadPresetCommands() {
		applyGraphPreset().forEach((command) => {
			this.addCommand(command);
		});
	}
}
