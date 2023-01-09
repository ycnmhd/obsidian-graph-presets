import { Command } from "obsidian";
import { ac, getSnapshot } from "../store/store";
import { t } from "../lang/text";

export const applyGraphPreset = (): Command[] => {
	return Object.values(getSnapshot().presets.meta).map((preset) => {
		return {
			id: `apply-graph-preset-${preset.created}`,
			name: `${t.c.APPLY} "${preset.name}"`,
			callback: () => {
				ac.applyPreset(preset);
			},
		};
	});
};
