import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MarkdownPresetMeta } from "src/graph-presets";
import { GetPresetDTO } from "src/helpers/get-preset";
import { applyPresetThunk } from "../thunks/apply-preset";
import { filesByCtime } from "../cache/files-by-time";
import { TFile } from "obsidian";
import { createPresetThunk } from "../thunks/create-preset";
import { refreshCacheThunk } from "../thunks/refresh-cache";
import { duplicatePresetThunk } from "../thunks/duplicate-preset";
import { fileIsPreset } from "../../helpers/file-is-preset";

export const fileEvents = ["modify", "delete", "rename"] as const;
export type FileEvent = typeof fileEvents[number];

type PresetsSlice = {
	meta: Record<number, MarkdownPresetMeta>;
	activePreset: number;
	starredPresets: Record<number, boolean>;
};

const initialState: PresetsSlice = {
	meta: {},
	activePreset: 0,
	starredPresets: {},
};

export const presetsSlice = createSlice({
	name: "presets",
	initialState,
	reducers: {
		toggleAutoApply: (
			state,
			{ payload: dto }: PayloadAction<GetPresetDTO>
		) => {
			state.meta[dto.created].disableAutoApply =
				!state.meta[dto.created].disableAutoApply;
		},

		updateFileMeta: (
			state,
			action: PayloadAction<{
				created: number;
				eventType: FileEvent;
			}>
		) => {
			if (action.payload.eventType === "delete") {
				delete state.meta[action.payload.created];
			} else if (
				action.payload.eventType === "rename" ||
				action.payload.eventType === "modify"
			) {
				state.meta[action.payload.created] = {
					...state.meta[action.payload.created],
				};
			}
		},

		setActivePreset: (state, action: PayloadAction<GetPresetDTO>) => {
			state.activePreset = action.payload.created;
		},
		setStarredFiles: (state, action: PayloadAction<string[]>) => {
			state.starredPresets = action.payload.reduce((acc, path) => {
				const file = app.vault.getAbstractFileByPath(path);
				if (file instanceof TFile && fileIsPreset(file)) {
					acc[file.stat.ctime] = true;
				}
				return acc;
			}, {} as Record<number, boolean>);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(applyPresetThunk.fulfilled, (state, action) => {
			const dto = action.meta.arg;

			state.meta[dto.created].applied = Date.now();
		});
		builder.addCase(refreshCacheThunk.fulfilled, (state, action) => {
			const meta = action.payload;
			state.meta = meta;
		});
		builder.addMatcher(
			isAnyOf(
				duplicatePresetThunk.fulfilled,
				createPresetThunk.fulfilled
			),
			(state, action) => {
				const dto = action.payload;
				state.meta[dto.created] = {
					applied: 0,
					disableAutoApply: false,
					created: dto.created,
				};
				filesByCtime.current[dto.created] =
					app.vault.getAbstractFileByPath(dto.path) as TFile;
			}
		);
	},
});
