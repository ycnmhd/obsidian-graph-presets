import { normalizePath, TAbstractFile } from "obsidian";

// based on https://github.com/zsviczian/obsidian-excalidraw-plugin/blob/da89e32213be8cb21ec8e0705ab5d5f8bcbac3dc/src/utils/FileUtils.ts#L73
export function uniqueFileName({
	filename,
	folderPath,
}: {
	folderPath: string;
	filename: string;
}): string {
	let newFilename = normalizePath(`${folderPath}/${filename}.md`);
	let newFile: TAbstractFile | null =
		app.vault.getAbstractFileByPath(newFilename);
	let i = 2;

	while (newFile) {
		newFilename = normalizePath(`${folderPath}/${filename} (${i++}).md`);
		newFile = app.vault.getAbstractFileByPath(newFilename);
	}
	return newFilename;
}
