import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetPresetDTO } from "src/helpers/get-preset";
import { obsidian } from "src/helpers/obsidian/obsidian";
import { filesByCtime } from "../cache/files-by-time";
import { RootState } from "../store";

export const duplicatePresetThunk = createAsyncThunk(
	"preset/duplicate",
	async ({ created }: GetPresetDTO, thunkAPI) => {
		const file = filesByCtime.current[created];

		const name = obsidian.fs.uniqueFileName({
			filename: file.basename,
			folderPath: file.parent.path,
		});

		const newFile = await app.vault.copy(file, name);
		const store = thunkAPI.getState() as RootState;
		return {
			created: newFile.stat.ctime,
			path: newFile.path,
			name: newFile.basename,
			disableAutoBindToLocalGraph:
				store.presets.meta[created].disableAutoBindToLocalGraph,
		};
	}
);
