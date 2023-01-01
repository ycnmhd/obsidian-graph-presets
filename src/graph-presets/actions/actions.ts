import { applyPreset } from "./apply-preset";
import { createPreset } from "./create-preset";
import { deletePreset } from "./delete-preset";
import { renamePreset } from "./rename-preset";
import { setSortBy } from "./set-sort-by";
import { updatePreset } from "./update-preset";
import { getPreset } from "./get-preset";
import { openFile } from "./open-file";
import { GraphPresets } from "../graph-presets";

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
};
