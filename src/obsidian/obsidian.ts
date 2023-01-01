import { getGraphSettings } from "./get-graph-settings";
import { applyGraphSettings } from "./apply-graph-settings";
import { setGraphSettings } from "./set-graph-settings";
import { createFolder } from "./fs/create-folder";
import { uniqueFileName } from "./fs/unique-file-name";
import { createFile } from "./fs/create-file";
import { updateFile } from "./fs/update-file";
import { readFile } from "./fs/read-file";
import { TAbstractFile, TFile } from "obsidian";
import { PresetViewType } from "src/graph-presets/views/preset/preset-view";

export const obsidian = {
	setGraphSettings,
	getGraphSettings,
	openGraphView: async () => {
		(app as any).commands.commands["graph:open"].callback();
		await new Promise((resolve) => setTimeout(resolve, 2000));
	},
	applyGraphSettings,
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
