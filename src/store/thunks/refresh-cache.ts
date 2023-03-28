import { createAsyncThunk } from "@reduxjs/toolkit";
import { GraphPresets, MarkdownPresetMeta } from "src/graph-presets";

import { acu } from "../ac";
import { filesByCtime } from "../cache/files-by-time";
import { fileHasPresetFrontmatter } from "src/helpers/file-is-preset";
import {
	getFileCacheAsync,
	getMarkdownFilesAsync,
} from "src/helpers/create-async-getter";
import { getStarredFiles } from "src/helpers/get-starred-files";

export const refreshCacheThunk = createAsyncThunk(
	"preset/refreshCache",
	async (action, api) => {
		const persistedMeta = GraphPresets.getInstance().settings.data.presets;
		const mdFiles = await getMarkdownFilesAsync();

		if (!mdFiles) throw new Error("No markdown files found");
		// wait for cache to be ready
		await getFileCacheAsync(mdFiles[0]);

		const presets = mdFiles.filter(fileHasPresetFrontmatter);

		const meta = Object.fromEntries(
			presets.map((f) => {
				const meta = persistedMeta[f.stat.ctime];
				return [
					f.stat.ctime,
					{
						applied: meta?.applied || 0,
						disableAutoApply: meta?.disableAutoApply,
						created: f.stat.ctime,
						localGraphFile: meta?.localGraphFile,
					},
				] satisfies [number, MarkdownPresetMeta];
			})
		);

		filesByCtime.current = Object.fromEntries(
			presets.map((f) => {
				return [f.stat.ctime, f];
			})
		);
		api.dispatch(acu.setStarredFiles(getStarredFiles()));
		return meta;
	}
);
