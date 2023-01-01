import { CachedMetadata, TAbstractFile, TFile } from "obsidian";

export const getFileCache = async (
	file: TAbstractFile,
	timeout = 10000
): Promise<CachedMetadata | void> => {
	if (!(file instanceof TFile)) return;
	const cache = app.metadataCache.getFileCache(file);
	if (cache) return cache;
	const start = Date.now();

	return new Promise((resolve) => {
		const interval = setInterval(() => {
			const cache = app.metadataCache.getFileCache(file);
			if (cache) {
				clearInterval(interval);
				resolve(cache);
			}
			if (Date.now() - start > timeout) {
				clearInterval(interval);
				resolve();
			}
		}, 100);
	});
};
