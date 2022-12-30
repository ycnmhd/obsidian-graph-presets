import { getGraphSettings } from "./get-graph-settings";
import { applyGraphSettings } from "./apply-graph-settings";
import { setGraphSettings } from "./set-graph-settings";
import { createFolder } from "./fs/create-folder";
import { uniqueFileName } from "./fs/unique-file-name";
import { createFile } from "./fs/create-file";
import { updateFile } from "./fs/update-file";
import { readFile } from "./fs/read-file";
import { TFile } from "obsidian";

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
		deleteFile: async (file: TFile) => {
			await app.vault.trash(file, false);
		},
		renameFile: async (file: TFile, newName: string) => {
			await app.vault.rename(file, newName);
		}
		,
		openFile: async (file: TFile) => {
			await app.workspace.openLinkText(file.path, "", false);
		}
	},
};
