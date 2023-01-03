import { normalizePath, TAbstractFile } from "obsidian";
const regex = () => /\((\d+)\)$/g;
// based on https://github.com/zsviczian/obsidian-excalidraw-plugin/blob/da89e32213be8cb21ec8e0705ab5d5f8bcbac3dc/src/utils/FileUtils.ts#L73
export function uniqueFileName({
	filename,
	folderPath,
}: {
	folderPath: string;
	filename: string;
}): string {
	filename = filename.trim();
	let i = 2;
	const num = regex().exec(filename);
	if (num) {
		i = parseInt(num[1]) + 1;
		filename = filename.replace(regex(), "").trim();
	}
	let newFilename = normalizePath(`${folderPath}/${filename}.md`);
	let newFile: TAbstractFile | null =
		app.vault.getAbstractFileByPath(newFilename);

	while (newFile) {
		newFilename = normalizePath(`${folderPath}/${filename} (${i++}).md`);
		newFile = app.vault.getAbstractFileByPath(newFilename);
	}
	return newFilename
}
