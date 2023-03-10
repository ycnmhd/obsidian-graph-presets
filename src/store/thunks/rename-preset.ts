import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetPresetDTO } from "src/helpers/get-preset";
import { obsidian } from "src/helpers/obsidian/obsidian";
import { filesByCtime } from "../cache/files-by-time";

export type RenamePresetDTO = GetPresetDTO & { newName: string };

export const renamePresetThunk = createAsyncThunk(
	"preset/rename",
	async (dto: RenamePresetDTO) => {
		const existingFile = filesByCtime.current[dto.created];
		if (!existingFile) throw new Error(`Preset does not exist`);
		if (existingFile.basename !== dto.newName) {
			const uniqueNewName = obsidian.fs.uniqueFileName({
				filename: dto.newName,
				folderPath: existingFile.parent.path,
			});
			await obsidian.fs.renameFile(existingFile, uniqueNewName);
		}
	}
);
