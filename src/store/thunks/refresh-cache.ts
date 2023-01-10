import { createAsyncThunk } from "@reduxjs/toolkit";
import { GraphPresets, MarkdownPresetMeta } from "src/graph-presets";

import { acu } from "../ac";
import { filesByCtime } from "../cache/files-by-time";
import { fileHasPresetFrontmatter } from "../../helpers/file-is-preset";
import {
	getFileCacheAsync,
	getMarkdownFilesAsync,
} from "../../helpers/create-async-getter";
import { getStarredFiles } from "../../helpers/get-starred-files";

export const refreshCacheThunk = createAsyncThunk(
	"preset/refreshCache",
	async (action, thunkAPI) => {
		const persistedMeta =
			GraphPresets.getInstance().settings.data.presetsMeta;
		const mdFiles = await getMarkdownFilesAsync();

		if (!mdFiles) throw new Error("No markdown files found");
		// wait for cache to be ready
		await getFileCacheAsync(mdFiles[0]);

		const presets = mdFiles.filter(fileHasPresetFrontmatter);

		const meta = Object.fromEntries(
			presets.map((f) => {
				const meta = persistedMeta[f.stat.ctime]?.meta;
				return [
					f.stat.ctime,
					{
						applied: meta?.applied || 0,
						disableAutoApply: Boolean(meta?.disableAutoApply),
						created: f.stat.ctime,
					},
				] as [number, MarkdownPresetMeta];
			})
		);

		filesByCtime.current = Object.fromEntries(
			presets.map((f) => {
				return [f.stat.ctime, f];
			})
		);
		thunkAPI.dispatch(acu.setStarredFiles(getStarredFiles()));
		return meta;
	}
);
