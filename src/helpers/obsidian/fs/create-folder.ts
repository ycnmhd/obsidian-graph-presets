// copied from https://github.com/zsviczian/obsidian-excalidraw-plugin/blob/da89e32213be8cb21ec8e0705ab5d5f8bcbac3dc/src/utils/FileUtils.ts#L129

import { normalizePath, Notice, TFile, TFolder } from "obsidian";
import { t } from "src/lang/text";

export async function createFolder(folderPath: string) {
	const vault = app.vault;
	folderPath = normalizePath(folderPath);
	//@ts-ignore
	const folder = vault.getAbstractFileByPathInsensitive(folderPath);
	if (folder && folder instanceof TFolder) {
		return folder;
	}
	if (folder && folder instanceof TFile) {
		new Notice(t.c.FOLDER_ALREADY_EXISTS_AS_FILE);
	} else {
		await vault.createFolder(folderPath);
		return vault.getAbstractFileByPath(folderPath) as TFolder;
	}
}
