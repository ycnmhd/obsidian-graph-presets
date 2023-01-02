import { Notice } from "obsidian";
import { GraphPresets } from "../graph-presets";
import { t } from "../lang/text";
import { graphSettingsGroup } from "./apply-preset";
import { GetPresetDTO } from "./get-preset";
import { updateMarkdownPreset } from "./save-preset-to-markdown/update-markdown-preset";

export const updatePreset = async (
	dto: GetPresetDTO,
	group?: graphSettingsGroup
) => {
	const plugin = GraphPresets.getInstance();

	await updateMarkdownPreset({
		dto,
		mode: group ? "group-from-graph" : "full-from-graph",
		group: group as any,
	});
	plugin.loadMarkdownPresetsMeta();
	new Notice(t.c.PRESET_UPDATED);
};
