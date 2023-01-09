import { Command, Notice } from "obsidian";

import { t } from "../lang/text";
import { PresetView, PresetViewType } from "../views/preset/preset-view";
import { ac } from "../store/store";

export const activePresetCommands: Command[] = [
	{
		id: `apply-active-graph-preset`,
		name: `${t.c.APPLY_ACTIVE_PRESET}`,
		callback: () => {
			const leaf = app.workspace.activeLeaf;
			if (leaf && leaf.view.getViewType() === PresetViewType) {
				const view = leaf.view as PresetView;
				ac.applyPreset({
					created: view.file.stat.ctime,
				});
			} else {
				new Notice(t.c.NO_PRESET_SELECTED);
			}
		},
	},
	{
		id: `update-active-graph-preset`,
		name: `${t.c.UPDATE_ACTIVE_PRESET}`,
		callback: () => {
			const leaf = app.workspace.activeLeaf;
			if (leaf && leaf.view.getViewType() === PresetViewType) {
				const view = leaf.view as PresetView;
				ac.updatePreset({
					created: view.file.stat.ctime,
				});
			} else {
				new Notice(t.c.NO_PRESET_SELECTED);
			}
		},
	},
];
