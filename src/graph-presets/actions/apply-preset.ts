import { Notice } from "obsidian";
import { obsidian } from "src/obsidian/obsidian";
import { GraphPresets } from "../graph-presets";

export const applyPreset = async (presetName: string) => {
	const plugin = GraphPresets.getInstance();
	const presets = plugin.settings.presets;
	const preset = presets[presetName];
	await obsidian.setGraphSettings(preset.settings);
	new Notice(`"${presetName}" applied`);
};
