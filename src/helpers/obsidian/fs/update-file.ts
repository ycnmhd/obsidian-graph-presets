import { TFile } from "obsidian";

export const updateFile = async ({
	file,
	data,
}: {
	file: TFile;
	data: string;
}) => {
	await app.vault.modify(file, data);
	return file;
};
