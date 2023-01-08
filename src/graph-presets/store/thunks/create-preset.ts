import { createAsyncThunk } from "@reduxjs/toolkit";
import { TFolder } from "obsidian";
import { createMarkdownPreset } from "src/graph-presets/actions/save-preset-to-markdown/create-markdown-preset";
import { sanitizePath } from "src/graph-presets/helpers/sanitize-path";
import { obsidian } from "src/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";

import { RootState } from "../store";

export type CreatePresetDTO = {
	presetName?: string;
	preset?: GraphSettings;
	folderPath?: string;
};
export const createPresetThunk = createAsyncThunk(
	"root/createPreset",
	async ({ folderPath, preset, presetName }: CreatePresetDTO, thunkAPI) => {
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
		};
	}
);
