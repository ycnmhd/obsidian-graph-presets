import { obsidian } from "../obsidian";

export const createFile = async ({
	folderPath,
	content,
	filename,
}: {
	folderPath: string;
	content: string;
	filename: string;
}) => {
	await obsidian.fs.createFolder(folderPath);
	const fileName = obsidian.fs.uniqueFileName({ folderPath, filename });
	const file = await app.vault.create(fileName, content);
	return file;
};
