import { TFolder } from "obsidian";
import { obsidian } from "src/obsidian/obsidian";
import { GraphPresets } from "../graph-presets";
import { savePresetToMarkdown } from "./save-preset-to-markdown/save-preset-to-markdown";

export const createPreset = async (presetName: string) => {
	const plugin = GraphPresets.getInstance();

	let file = app.vault.getAbstractFileByPath(
		plugin.store.getSnapshot().settings.preferences.presetsFolder
	) as TFolder;
	if (!file) {
		file = await obsidian.fs.createFolder(
			plugin.store.getSnapshot().settings.preferences.presetsFolder
		) as TFolder;
	}
	await savePresetToMarkdown({
		file,
		mode: "create",
		filename: presetName,
	});
	plugin.loadMarkdownPresetsMeta();
};
