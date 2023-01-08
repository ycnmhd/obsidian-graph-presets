import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	GraphPresets,
	MarkdownPresetMeta,
} from "src/graph-presets/graph-presets";
import { GetPresetDTO } from "src/graph-presets/actions/get-preset";
import { fileIsPreset } from "src/graph-presets/helpers/file-is-preset";
import { applyPresetThunk } from "../thunks/apply-preset";
import { filesByCtime } from "../cache/files-by-time";
import { FileEvent } from "src/graph-presets/event-listeners/file-event-listeners";
import { TFile } from "obsidian";

export type PluginState = {
	filter: string;
};
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
				updated: number;
				name: string;
				eventType: FileEvent;
				path: string;
			}>
		) => {
			if (action.payload.eventType === "delete") {
				delete state.meta[action.payload.created];
			} else if (action.payload.eventType === "modify") {
				state.meta[action.payload.created].updated =
					action.payload.updated;
			} else if (action.payload.eventType === "rename") {
				state.meta[action.payload.created].name = action.payload.name;
			} else if (action.payload.eventType === "create") {
				const dto = action.payload;
				state.meta[dto.created] = {
					applied: 0,
					disableAutoApply: false,
					created: dto.created,
					updated: dto.created,
					name: dto.name,
					path: dto.path,
				};
				filesByCtime.current[dto.created] =
					app.vault.getAbstractFileByPath(dto.path) as TFile;
			}
		},
		refreshCache: (state) => {
			const persistedMeta =
				GraphPresets.getInstance().settings.data.presetsMeta;
			const mdFiles = app.vault.getMarkdownFiles().filter((f) => {
				return fileIsPreset(f);
			});

			const meta = Object.fromEntries(
				mdFiles.map((f) => {
					const meta = persistedMeta[f.stat.ctime]?.meta;
					return [
						f.stat.ctime,
						{
							applied: meta?.applied || 0,
							disableAutoApply: Boolean(meta?.disableAutoApply),
							created: f.stat.ctime,
							updated: f.stat.mtime,
							name: f.basename,
							path: f.path,
						},
					] as [number, MarkdownPresetMeta];
				})
			);

			state.meta = meta;
			filesByCtime.current = Object.fromEntries(
				mdFiles.map((f) => {
					return [f.stat.ctime, f];
				})
			);
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
	},
});
