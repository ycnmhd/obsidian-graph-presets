import { preferencesSlice } from "./slices/preferences-slice";
import { presetsSlice } from "./slices/presets-slice";
import { applyPresetThunk } from "./thunks/apply-preset";
import { createPresetThunk } from "./thunks/create-preset";
import { deletePresetThunk } from "./thunks/delete-preset";
import { renamePresetThunk } from "./thunks/rename-preset";
import { updateAttributeThunk } from "./thunks/update-attribute";
import { updatePresetThunk } from "./thunks/update-perset";

export const acu = {
	...presetsSlice.actions,
	...preferencesSlice.actions,
	applyPreset: applyPresetThunk,
	createPreset: createPresetThunk,
	deletePreset: deletePresetThunk,
	renamePreset: renamePresetThunk,
	updateAttribute: updateAttributeThunk,
	updatePreset: updatePresetThunk,
};
