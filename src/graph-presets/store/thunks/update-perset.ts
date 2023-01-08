import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notice } from "obsidian";
import { GetPresetDTO } from "src/graph-presets/actions/get-preset";
import { updateMarkdownPreset } from "src/graph-presets/actions/save-preset-to-markdown/update-markdown-preset";
import { t } from "src/graph-presets/lang/text";

export const updatePresetThunk = createAsyncThunk(
	"root/updatePreset",
	async (dto: GetPresetDTO) => {
		await updateMarkdownPreset({
			dto,
			mode: dto.group ? "group-from-graph" : "full-from-graph",
			group: dto.group as any,
		});
		new Notice(t.c.PRESET_UPDATED);
	}
);
