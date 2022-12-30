import { Notice } from "obsidian";
import { obsidian } from "src/obsidian/obsidian";
import { GraphPresets } from "../graph-presets";
import { actions } from "./actions";
import { GetPresetDTO } from "./get-preset";

export type graphSettingsGroup = "filters" | "groups" | "display" | "forces";

export const applyPreset = async (
	dto: GetPresetDTO,
	group?: graphSettingsGroup
) => {
	const plugin = GraphPresets.getInstance();
	const presetsMeta = plugin.settings.data.presetsMeta;
	const preset = await actions.getPreset(dto);
	await obsidian.applyGraphSettings(preset, group);
	if (!presetsMeta[dto.created]) {
		presetsMeta[dto.created] = {
			meta: {
				applied: Date.now(),
			},
		};
	} else {
		presetsMeta[dto.created].meta.applied = Date.now();
	}
	await plugin.saveSettings();
	plugin.loadMarkdownPresetsMeta();
	new Notice(`Preset applied`);
};
