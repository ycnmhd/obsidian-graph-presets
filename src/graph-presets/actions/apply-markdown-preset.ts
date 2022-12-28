import { Notice } from "obsidian";
import { obsidian } from "src/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { GraphPresets } from "../graph-presets";
import { graphSettingsGroup } from "./apply-preset";

export const applyMarkdownPreset = async (
	preset: Partial<GraphSettings>,
	group?: graphSettingsGroup
) => {
	const plugin = GraphPresets.getInstance();
	await obsidian.applyGraphSettings(preset, group);
	await plugin.saveSettings();
	new Notice(`Preset applied`);
};
