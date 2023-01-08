import { TAbstractFile, TFile, normalizePath } from "obsidian";
import { getSnapshot } from "src/graph-presets/store/store";
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
	const store = getSnapshot();
	let newFile: TFile | undefined = undefined;
	const preset =
		presetToSave ||
		((await obsidian.graph.getSettings({ dto: null })) as GraphSettings);
	const markdownPreset = mapPresetToMarkdown(
		preset,
		store.preferences.markdownPresets
	);
	const folderName = file instanceof TFile ? file.parent.path : file.path;
	const folderPath = normalizePath(
		folderName ? folderName : store.preferences.presetsFolder
	);
	newFile = await obsidian.fs.createFile({
		folderPath,
		filename: filename || "preset",
		content: markdownPreset,
	});
	return newFile;
};
