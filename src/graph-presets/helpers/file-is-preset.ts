import { TAbstractFile, TFile } from "obsidian";
import { FRONTMATTER_KEY } from "./constants";
import { getFileCache } from "./get-file-cache";

export const fileIsPreset =  (file: TAbstractFile): boolean => {
	if (!(file instanceof TFile)) return false;
	const cache = app.metadataCache.getFileCache(file);
	if (!cache) return false;
	if (!cache?.frontmatter || !cache.frontmatter[FRONTMATTER_KEY])
		return false;
	return true;
};

export const fileIsPresetAsync = async (file: TAbstractFile): Promise<boolean> => {
	if (!(file instanceof TFile)) return false;
	const cache = await getFileCache(file);
	if (!cache) return false;
	if (!cache?.frontmatter || !cache.frontmatter[FRONTMATTER_KEY])
		return false;
	return true;
};
