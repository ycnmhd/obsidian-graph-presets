import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notice } from "obsidian";
import { GetPresetDTO } from "src/helpers/get-preset";
import { t } from "src/lang/text";
import { updateMarkdownPreset } from "../../helpers/save-preset-to-markdown/update-markdown-preset";

export const updatePresetThunk = createAsyncThunk(
	"preset/update",
	async (dto: GetPresetDTO) => {
		await updateMarkdownPreset({
			dto,
			mode: dto.group ? "group-from-graph" : "full-from-graph",
			group: dto.group as any,
		});
		new Notice(t.c.PRESET_UPDATED);
	}
);
