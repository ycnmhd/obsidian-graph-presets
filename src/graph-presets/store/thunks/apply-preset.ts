import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notice } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";
import { GetPresetDTO } from "src/graph-presets/actions/get-preset";
import { t } from "src/graph-presets/lang/text";
import { obsidian } from "src/obsidian/obsidian";

export const applyPresetThunk = createAsyncThunk(
	"root/applyPreset",
	async (dto: GetPresetDTO) => {
		const preset = await actions.getPreset(dto);
		await obsidian.graph.setSettings({
			settings: preset,
			group: dto.group,
			dto,
		});
		new Notice(t.c.PRESET_APPLIED);
	}
);
