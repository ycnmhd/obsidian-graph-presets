import { Notice } from "obsidian";
import { obsidian } from "src/obsidian/obsidian";
import { GraphPresets } from "../graph-presets";

export type graphSettingsGroup = "filters" | "groups" | "display" | "forces";

export const applyPreset = async (
	presetName: string,
	group?: graphSettingsGroup
) => {
	const plugin = GraphPresets.getInstance();
	const presets = plugin.settings.presets;
	const preset = presets[presetName];
	await obsidian.applyGraphSettings(preset.settings, group);
	new Notice(`"${presetName}" applied`);
};
