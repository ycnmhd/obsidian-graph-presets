import { createAsyncThunk } from "@reduxjs/toolkit";
import { TFolder } from "obsidian";
import { createMarkdownPreset } from "src/helpers/save-preset-to-markdown/create-markdown-preset";
import { obsidian } from "src/helpers/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";

import { RootState } from "../store";
import { sanitizePath } from "../../helpers/sanitize-path";

export type CreatePresetDTO = {
	presetName?: string;
	preset?: GraphSettings;
	folderPath?: string;
	dontOpenAfterCreation?: boolean;
};
export const createPresetThunk = createAsyncThunk(
	"preset/create",
	async (
		{
			folderPath,
			preset,
			presetName,
			dontOpenAfterCreation,
		}: CreatePresetDTO,
		thunkAPI
	) => {
		const store = thunkAPI.getState() as RootState;
		presetName = presetName ? sanitizePath(presetName, "-") : "preset";
		let file = app.vault.getAbstractFileByPath(
			folderPath || store.preferences.presetsFolder
		) as TFolder;
		if (!file) {
			file = (await obsidian.fs.createFolder(
				folderPath || store.preferences.presetsFolder
			)) as TFolder;
		}
		const newFile = await createMarkdownPreset({
			file,
			filename: presetName,
			preset,
		});

		return {
			created: newFile.stat.ctime,
			path: newFile.path,
			name: newFile.basename,
			dontOpenAfterCreation,
		};
	}
);
