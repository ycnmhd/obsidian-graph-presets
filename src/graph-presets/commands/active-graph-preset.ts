import { Command, Notice } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";

import { t } from "../lang/text";
import { PresetView, PresetViewType } from "../views/preset/preset-view";

export const activePresetCommands: Command[] = [
	{
		id: `apply-active-graph-preset`,
		name: `${t.c.APPLY_ACTIVE_PRESET}`,
		callback: () => {
			const leaf = app.workspace.activeLeaf;
			if (leaf && leaf.view.getViewType() === PresetViewType) {
				const view = leaf.view as PresetView;
				actions.applyPreset(view.getPresetMeta());
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
				actions.updatePreset({
					created: view.getPresetMeta().created,
				});
			} else {
				new Notice(t.c.NO_PRESET_SELECTED);
			}
		},
	},
];
