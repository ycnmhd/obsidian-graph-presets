// copied from https://github.com/zsviczian/obsidian-excalidraw-plugin/blob/da89e32213be8cb21ec8e0705ab5d5f8bcbac3dc/src/utils/FileUtils.ts#L129

import { normalizePath, Notice, TFile, TFolder } from "obsidian";

export async function createFolder(folderPath: string) {
	const vault = app.vault;
	folderPath = normalizePath(folderPath);
	//@ts-ignore
	const folder = vault.getAbstractFileByPathInsensitive(folderPath);
	if (folder && folder instanceof TFolder) {
		return folder;
	}
	if (folder && folder instanceof TFile) {
		new Notice(
			`The folder cannot be created because it already exists as a file: ${folderPath}.`
		);
	} else {
		await vault.createFolder(folderPath);
		return vault.getAbstractFileByPath(folderPath) as TFolder;
	}
}
