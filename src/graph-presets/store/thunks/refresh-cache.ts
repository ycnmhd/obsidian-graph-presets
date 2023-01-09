import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	GraphPresets,
	MarkdownPresetMeta,
} from "src/graph-presets/graph-presets";
import {
	getFileCacheAsync,
	getMarkdownFilesAsync,
} from "src/graph-presets/helpers/create-async-getter";
import { fileHasPresetFrontmatter } from "src/graph-presets/helpers/file-is-preset";
import { getStarredFiles } from "src/graph-presets/helpers/get-starred-files";
import { acu } from "../ac";
import { filesByCtime } from "../cache/files-by-time";

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
						updated: f.stat.mtime,
						name: f.basename,
						path: f.path,
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
