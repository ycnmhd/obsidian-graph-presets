import { TFolder } from "obsidian";
import { obsidian } from "src/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { GraphPresets } from "../graph-presets";
import { fileIsPresetAsync } from "../helpers/file-is-preset";
import { sanitizePath } from "../helpers/sanitize-path";
import { actions } from "./actions";
import { createMarkdownPreset } from "./save-preset-to-markdown/create-markdown-preset";

export const createPreset = async (
	presetName?: string,
	preset?: GraphSettings,
	folderPath?: string,
	openFileAfterCreation?: boolean
) => {
	presetName = presetName ? sanitizePath(presetName, "-") : "preset";
	const plugin = GraphPresets.getInstance();

	let file = app.vault.getAbstractFileByPath(
		folderPath ||
			plugin.store.getSnapshot().settings.preferences.presetsFolder
	) as TFolder;
	if (!file) {
		file = (await obsidian.fs.createFolder(
			folderPath ||
				plugin.store.getSnapshot().settings.preferences.presetsFolder
		)) as TFolder;
	}
	const newFile = await createMarkdownPreset({
		file,
		filename: presetName,
		preset,
	});
	if (newFile && openFileAfterCreation) {
		await fileIsPresetAsync(newFile);
		await actions.openFile({ created: newFile.stat.ctime, file: newFile });
	}
	plugin.loadMarkdownPresetsMeta();
};
