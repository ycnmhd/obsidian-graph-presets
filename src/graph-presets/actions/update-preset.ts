import { Notice } from "obsidian";
import { obsidian } from "src/obsidian/obsidian";
import { GraphPresets } from "../graph-presets";

export const updatePreset = async (presetName: string) => {
	const plugin = GraphPresets.getInstance();
	const settings = await obsidian.getGraphSettings();
	const preset = plugin.settings.presets[presetName];
	if (!preset)  throw new Error(`Preset "${presetName}" does not exist`);
	preset.settings = settings;
	preset.meta.updated = Date.now();
	await plugin.saveSettings();
	new Notice(`Preset "${presetName}" updated`);
};
