import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetPresetDTO } from "src/helpers/get-preset";
import { updateMarkdownPreset } from "src/helpers/save-preset-to-markdown/update-markdown-preset";

export const updatePresetThunk = createAsyncThunk(
	"preset/update",
	async (dto: GetPresetDTO) => {
		await updateMarkdownPreset({
			dto,
			mode: dto.group ? "group-from-graph" : "full-from-graph",
			group: dto.group as any,
		});
	}
);
