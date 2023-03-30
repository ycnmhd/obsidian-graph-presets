import { TAbstractFile, TFile, normalizePath } from "obsidian";
import { getSnapshot } from "src/store/store";
import { obsidian } from "src/helpers/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { mapPresetToMarkdown } from "./helpers/map-preset-to-markdown";
import { PRESET_FRONTMATTER } from "../constants";

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

	const folderName = file instanceof TFile ? file.parent.path : file.path;
	const folderPath = normalizePath(
		folderName ? folderName : store.preferences.presetsFolder
	);
	newFile = await obsidian.fs.createFile({
		folderPath,
		filename: filename || "preset",
		content: PRESET_FRONTMATTER,
	});

	const preset =
		presetToSave ||
		((await obsidian.graph.getSettings({
			dto: {
				created: newFile.stat.ctime,
			},
		})) as GraphSettings);

	const markdownPreset = mapPresetToMarkdown(
		preset,
		store.preferences.markdownPresets
	);
	await obsidian.fs.updateFile({
		file: newFile,
		data: markdownPreset,
	});
	return newFile;
};
