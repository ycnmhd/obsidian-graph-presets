import { getGraphSettings } from "src/obsidian/graph/get-graph-settings/get-graph-settings";
import { createFolder } from "./fs/create-folder";
import { uniqueFileName } from "./fs/unique-file-name";
import { createFile } from "./fs/create-file";
import { updateFile } from "./fs/update-file";
import { readFile } from "./fs/read-file";
import { TAbstractFile, TFile } from "obsidian";
import { PresetViewType } from "src/graph-presets/views/preset/preset-view";
import { setGraphSettings } from "src/obsidian/graph/set-graph-settings/set-graph-settings";

export const obsidian = {
	graph: {
		getSettings: getGraphSettings,
		open: async () => {
			app.workspace
				.getLeaf("split", "vertical")
				.setViewState({ type: "graph" });
			await new Promise((resolve) => {
				const interval = setInterval(() => {
					if (app.workspace.getLeavesOfType("graph").length) {
						clearInterval(interval);
						resolve(null);
					}
				}, 100);
			});
		},
		setSettings: setGraphSettings,
	},
	fs: {
		createFolder,
		uniqueFileName,
		createFile,
		updateFile,
		readFile,
		deleteFile: async (file: TAbstractFile) => {
			await app.vault.trash(file, false);
		},
		renameFile: async (file: TFile, newName: string) => {
			await app.vault.rename(file, newName);
		},
		openFile: async ({
			file,
			position,
		}: {
			file: TFile;
			position?: "right-replace-adjacent-leaf" | "right-new-leaf";
		}) => {
			if (position === "right-replace-adjacent-leaf") {
				const leaf =
					app.workspace.getLeavesOfType(PresetViewType)[0] ||
					app.workspace.getLeavesOfType("markdown")[0] ||
					app.workspace.getLeavesOfType("empty")[0];
				if (leaf) {
					await leaf.openFile(file);
					await app.workspace.revealLeaf(leaf);
					return;
				} else {
					position = "right-new-leaf";
				}
			}
			if (position === "right-new-leaf") {
				const leaf = app.workspace.getLeaf("split", "vertical");
				await leaf.openFile(file);
			} else {
				await app.workspace.getLeaf().openFile(file);
			}
		},
	},
};
