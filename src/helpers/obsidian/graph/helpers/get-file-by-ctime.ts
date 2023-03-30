import { TFile } from "obsidian";

const cache: Record<number, TFile> = {};
export const getFileByCtime = (ctime: number) => {
	if (cache[ctime]) {
		return cache[ctime];
	}
	const file = app.vault
		.getMarkdownFiles()
		.find((f) => f.stat.ctime === ctime);
	if (file) {
		cache[ctime] = file;
		return file;
	}
};
