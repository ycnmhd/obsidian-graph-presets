import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notice } from "obsidian";
import { getPreset, GetPresetDTO } from "src/helpers/get-preset";
import { t } from "src/lang/text";
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
		new Notice(t.c.PRESET_APPLIED);
	}
);
