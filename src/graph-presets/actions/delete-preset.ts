import { Notice } from "obsidian";
import { GraphPresets } from "../graph-presets";

export const deletePreset = async (presetName: string) => {
	const plugin = GraphPresets.getInstance();
	delete plugin.settings.presets[presetName];
	await plugin.saveSettings();
	new Notice(`Preset "${presetName}" deleted`);
};
