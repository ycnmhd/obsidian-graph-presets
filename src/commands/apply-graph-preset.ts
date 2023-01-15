import { Command } from "obsidian";
import { ac, getSnapshot } from "../store/store";
import { t } from "../lang/text";
import { filesByCtime } from "src/store/cache/files-by-time";
import { MarkdownPresetMeta } from "src/graph-presets";

export const mapPresetToCommand = (preset: MarkdownPresetMeta): Command => {
	const file = filesByCtime.current[preset.created];
	return {
		id: `apply-graph-preset-${preset.created}`,
		name: `${t.c.APPLY} "${file.basename}"`,
		callback: () => {
			ac.applyPreset(preset);
		},
	};
};

export const applyGraphPreset = (): Command[] => {
	return Object.values(getSnapshot().presets.meta).map(mapPresetToCommand);
};
