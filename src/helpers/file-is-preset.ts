import { TAbstractFile, TFile } from "obsidian";
import { filesByCtime } from "../store/cache/files-by-time";
import { FRONTMATTER_KEY } from "./constants";

export const fileIsPreset = (file: TAbstractFile): boolean => {
	return (
		file instanceof TFile && Boolean(filesByCtime.current[file.stat.ctime])
	);
};

export const fileHasPresetFrontmatter = (file: TAbstractFile): boolean => {
	if (file instanceof TFile) {
		const cache = app.metadataCache.getFileCache(file);
		return cache?.frontmatter && cache.frontmatter[FRONTMATTER_KEY];
	}
	return false;
};
