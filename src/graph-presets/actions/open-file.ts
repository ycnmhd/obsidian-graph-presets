import { obsidian } from "src/obsidian/obsidian";
import { GraphPresets } from "../graph-presets";
import { GetPresetDTO } from "./get-preset";

export const openFile = async (dto: GetPresetDTO) => {
	const plugin = GraphPresets.getInstance();
	const file = plugin.store.getSnapshot().state.files[dto.created];
	await obsidian.fs.openFile(file);
};
