import { TAbstractFile, TFile } from "obsidian";
import { FRONTMATTER_KEY } from "./constants";

export const fileIsPreset = (file: TAbstractFile): boolean => {
	if (!(file instanceof TFile)) return false;
	const cache = app.metadataCache.getFileCache(file);
	if (!cache?.frontmatter || !cache.frontmatter[FRONTMATTER_KEY])
		return false;
	return true;
};
