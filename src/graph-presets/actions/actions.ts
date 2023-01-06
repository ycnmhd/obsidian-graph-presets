import { applyPreset } from "./apply-preset";
import { createPreset } from "./create-preset";
import { deletePreset } from "./delete-preset";
import { renamePreset } from "./rename-preset";
import { setSortBy } from "./set-sort-by";
import { updatePreset } from "./update-preset";
import { getPreset, GetPresetDTO } from "./get-preset";
import { openFile } from "./open-file";
import { GraphPresets } from "../graph-presets";
import { saveAttribute } from "./save-attribute";

export const actions = {
	applyPreset,
	createPreset,
	deletePreset,
	renamePreset,
	updatePreset,
	setSortBy,
	getPreset,
	openFile,
	setFilter: (filter: string) => {
		const plugin = GraphPresets.getInstance();
		plugin.store.set((store) => ({
			state: {
				...store.state,
				filter,
			},
		}));
	},
	saveAttribute,
	toggleAutoApply: (dto: GetPresetDTO) => {
		const plugin = GraphPresets.getInstance();
		const presets = plugin.settings.data.presetsMeta;
		if (!presets[dto.created]) {
			presets[dto.created] = {
				meta: {
					applied: 0,
					disableAutoApply: false,
				},
			};
		}
		const current = presets[dto.created].meta.disableAutoApply;
		presets[dto.created].meta.disableAutoApply = !current;
		plugin.saveSettings();
		plugin.loadMarkdownPresetsMeta();
		return !current;
	},
};
