import { obsidian } from "src/obsidian/obsidian";
import { GraphPresets } from "../graph-presets";
import { GetPresetDTO } from "./get-preset";

export const deletePreset = async (dto: GetPresetDTO) => {
	const plugin = GraphPresets.getInstance();
	const preset = plugin.store.getSnapshot().state.files[dto.created];
	await obsidian.fs.deleteFile(preset);
	const presetsMeta = plugin.settings.data.presetsMeta;
	if (presetsMeta[dto.created]) {
		delete presetsMeta[dto.created];
		await plugin.saveSettings();
	}
	plugin.loadMarkdownPresetsMeta();
};
