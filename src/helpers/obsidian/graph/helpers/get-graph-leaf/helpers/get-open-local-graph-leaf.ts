import { TFile } from "obsidian";

export const getOpenLocalGraphLeaf = (localGraphFile: number) => {
	const graphLeaves = app.workspace.getLeavesOfType("localgraph");
	return graphLeaves.find((l) => {
		const file = (l.view as any).file;
		if (file instanceof TFile) {
			return file.stat.ctime === localGraphFile;
		}
	});
};
