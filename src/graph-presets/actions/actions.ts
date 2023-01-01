import { applyPreset } from "./apply-preset";
import { createPreset } from "./create-preset";
import { deletePreset } from "./delete-preset";
import { renamePreset } from "./rename-preset";
import { setSortBy } from "./set-sort-by";
import { updatePreset } from "./update-preset";
import { applyMarkdownPreset } from "./apply-markdown-preset";
import { getPreset } from "./get-preset";
import { openFile } from "./open-file";


export const actions = {
	applyPreset,
	createPreset,
	deletePreset,
	renamePreset,
	updatePreset,
	setSortBy,
	applyMarkdownPreset,
	getPreset,
	openFile,
};
