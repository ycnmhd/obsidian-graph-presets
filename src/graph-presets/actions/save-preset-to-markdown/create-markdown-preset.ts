import { TAbstractFile, TFile, normalizePath } from "obsidian";
import GraphPresets from "src/main";
import { obsidian } from "src/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { mapPresetToMarkdown } from "./helpers/map-preset-to-markdown";

export const createMarkdownPreset = async ({
	file,
	filename,
	preset: presetToSave,
}: {
	file: TAbstractFile;
	filename?: string;
	preset?: GraphSettings;
}) => {
	const plugin = GraphPresets.getInstance();
	let newFile: TFile | undefined = undefined;
	const preset =
		presetToSave ||
		((await obsidian.graph.getSettings({ dto: null })) as GraphSettings);
	const markdownPreset = mapPresetToMarkdown(
		preset,
		plugin.settings.preferences.markdownPresets
	);
	const folderName = file instanceof TFile ? file.parent.path : file.path;
	const folderPath = normalizePath(
		folderName ? folderName : plugin.settings.preferences.presetsFolder
	);
	newFile = await obsidian.fs.createFile({
		folderPath,
		filename: filename || "preset",
		content: markdownPreset,
	});
	return newFile;
};
