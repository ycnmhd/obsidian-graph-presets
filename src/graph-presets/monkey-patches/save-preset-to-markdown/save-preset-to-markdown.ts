import { TAbstractFile, TFile, normalizePath } from "obsidian";
import GraphPresets from "src/main";
import { obsidian } from "src/obsidian/obsidian";
import { mapPresetToMarkdown } from "./helpers/map-preset-to-markdown";

export const savePresetToMarkdown = async ({
	file,
}: {
	file: TAbstractFile;
}) => {
	const plugin = GraphPresets.getInstance();
	const preset = await obsidian.getGraphSettings();
	const markdownPreset = mapPresetToMarkdown(preset);
	const folderName = file instanceof TFile ? file.parent.path : file.path;
	const folderPath = normalizePath(
		folderName ? folderName : plugin.settings.preferences.presetsFolder
	);
	const newFile = await obsidian.fs.createFile({
		folderPath,
		filename: "preset",
		content: markdownPreset,
	});

	const leaf = app.workspace.getLeaf("split", "horizontal");
	await leaf.openFile(newFile);
};
