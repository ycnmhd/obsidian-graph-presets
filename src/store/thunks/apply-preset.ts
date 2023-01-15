import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPreset, GetPresetDTO } from "src/helpers/get-preset";
import { obsidian } from "src/helpers/obsidian/obsidian";

export const applyPresetThunk = createAsyncThunk(
	"preset/apply",
	async (dto: GetPresetDTO) => {
		const preset = await getPreset(dto);
		await obsidian.graph.setSettings({
			settings: preset,
			group: dto.group,
			dto,
		});
	}
);
