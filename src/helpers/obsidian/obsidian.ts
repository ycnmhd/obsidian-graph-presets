import { getGraphSettings } from "src/helpers/obsidian/graph/get-graph-settings/get-graph-settings";
import { createFolder } from "./fs/create-folder";
import { uniqueFileName } from "./fs/unique-file-name";
import { createFile } from "./fs/create-file";
import { updateFile } from "./fs/update-file";
import { readFile } from "./fs/read-file";
import { TAbstractFile, TFile, WorkspaceLeaf } from "obsidian";
import { PresetViewType } from "src/views/preset/preset-view";
import { setGraphSettings } from "src/helpers/obsidian/graph/set-graph-settings/set-graph-settings";
import { getFileByCtime } from "./graph/helpers/get-file-by-ctime";

export const obsidian = {
	graph: {
		getSettings: getGraphSettings,
		open: async (localGraphFile?: number) => {
			let file: TFile | undefined = undefined;
			if (localGraphFile) {
				file = getFileByCtime(localGraphFile);
			}
			const type = file ? "localgraph" : "graph";

			if (file) {
				const activeLeaf = app.workspace.getLeaf();
				await obsidian.fs.openFile({
					file,
					position: "right-new-tab",
				});
				await (
					app as any
				).internalPlugins.plugins.graph.commands[1].checkCallback();
				app.workspace.revealLeaf(activeLeaf);
			} else {
				app.workspace.getLeaf("split", "vertical").setViewState({
					type,
				});
			}
			return new Promise((resolve) => {
				const interval = setInterval(() => {
					if (app.workspace.getLeavesOfType(type).length) {
						clearInterval(interval);
						resolve(app.workspace.getLeavesOfType(type)[0]);
					}
				}, 100);
			}) as Promise<WorkspaceLeaf>;
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
			position?:
				| "right-new-tab"
				| "right-replace-tab"
				| "right-new-split";
		}) => {
			if (position === "right-replace-tab") {
				const leaf =
					app.workspace.getLeavesOfType(PresetViewType)[0] ||
					app.workspace.getLeavesOfType("markdown")[0] ||
					app.workspace.getLeavesOfType("empty")[0];
				if (leaf) {
					await leaf.openFile(file);
					await app.workspace.revealLeaf(leaf);
					return;
				} else {
					position = "right-new-tab";
				}
			}

			if (position === "right-new-tab") {
				const leaf = app.workspace.getLeaf("tab" as any, "vertical");
				await leaf.openFile(file);
			} else if (position === "right-new-split") {
				const leaf = app.workspace.getLeaf("split", "vertical");
				await leaf.openFile(file);
			} else {
				await app.workspace.getLeaf().openFile(file);
			}
		},
	},
};
