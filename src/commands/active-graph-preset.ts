import { Command } from "obsidian";

import { t } from "../lang/text";
import { PresetView } from "../views/preset/preset-view";
import { ac } from "../store/store";

export const activePresetCommands: Command[] = [
	{
		id: `apply-active-graph-preset`,
		name: `${t.c.APPLY_ACTIVE_PRESET}`,
		checkCallback: (checking) => {
			const view = app.workspace.getActiveViewOfType(PresetView);
			if (checking) return Boolean(view && view.file);
			if (view && view.file) {
				ac.applyPreset({
					created: view.file.stat.ctime,
				});
			}
		},
	},
	{
		id: `update-active-graph-preset`,
		name: `${t.c.UPDATE_ACTIVE_PRESET}`,
		checkCallback: (checking) => {
			const view = app.workspace.getActiveViewOfType(PresetView);
			if (checking) return Boolean(view && view.file);
			if (view && view.file) {
				ac.updatePreset({
					created: view.file.stat.ctime,
				});
			}
		},
	},
];
