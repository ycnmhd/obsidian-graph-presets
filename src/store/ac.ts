import { preferencesSlice } from "./slices/preferences-slice";
import { presetsSlice } from "./slices/presets-slice";
import { applyPresetThunk } from "./thunks/apply-preset";
import { createPresetThunk } from "./thunks/create-preset";
import { deletePresetThunk } from "./thunks/delete-preset";
import { duplicatePresetThunk } from "./thunks/duplicate-preset";
import { refreshCacheThunk } from "./thunks/refresh-cache";
import { renamePresetThunk } from "./thunks/rename-preset";
import { updatePresetThunk } from "./thunks/update-preset";

export const acu = {
	...presetsSlice.actions,
	...preferencesSlice.actions,
	applyPreset: applyPresetThunk,
	createPreset: createPresetThunk,
	deletePreset: deletePresetThunk,
	renamePreset: renamePresetThunk,
	updatePreset: updatePresetThunk,
	refreshCache: refreshCacheThunk,
	duplicatePreset: duplicatePresetThunk,
};
