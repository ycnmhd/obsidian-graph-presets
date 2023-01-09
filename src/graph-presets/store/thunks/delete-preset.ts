import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetPresetDTO } from "src/graph-presets/actions/get-preset";
import { obsidian } from "src/obsidian/obsidian";
import { filesByCtime } from "../cache/files-by-time";

export const deletePresetThunk = createAsyncThunk(
	"preset/delete",
	async (dto: GetPresetDTO) => {
		const preset = filesByCtime.current[dto.created];
		await obsidian.fs.deleteFile(preset);
	}
);
