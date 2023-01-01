import { obsidian } from "src/obsidian/obsidian";
import { GraphPresets } from "../graph-presets";
import { GetPresetDTO } from "./get-preset";

export const renamePreset = async (dto: GetPresetDTO, newName: string) => {
	const plugin = GraphPresets.getInstance();

	const existingFile =
		plugin.store.getSnapshot().state.filesByCtime[dto.created];
	if (!existingFile) throw new Error(`Preset does not exist`);
	if (existingFile.basename !== newName) {
		const uniqueNewName = await obsidian.fs.uniqueFileName({
			filename: newName,
			folderPath: existingFile.parent.path,
		});
		await obsidian.fs.renameFile(existingFile, uniqueNewName);
		plugin.loadMarkdownPresetsMeta();
	}
};
