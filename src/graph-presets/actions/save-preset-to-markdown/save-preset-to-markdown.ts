import { TAbstractFile, TFile, normalizePath } from "obsidian";
import GraphPresets from "src/main";
import { obsidian } from "src/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { actions } from "../actions";
import { graphSettingsGroup } from "../apply-preset";
import { pickGroup } from "../helpers/pick-group";
import { mapPresetToMarkdown } from "./helpers/map-preset-to-markdown";

// TODO: breakdown to create and update
export const savePresetToMarkdown = async ({
	file,
	mode,
	filename,
	group,
}: {
	file: TAbstractFile;
	mode: "create" | "update";
	filename?: string;
	group?: graphSettingsGroup;
}) => {
	const plugin = GraphPresets.getInstance();
	let newFile: TFile | undefined = undefined;
	const preset = await obsidian.getGraphSettings();
	if (mode === "create") {
		const markdownPreset = mapPresetToMarkdown(preset);
		const folderName = file instanceof TFile ? file.parent.path : file.path;
		const folderPath = normalizePath(
			folderName ? folderName : plugin.settings.preferences.presetsFolder
		);
		newFile = await obsidian.fs.createFile({
			folderPath,
			filename: filename || "preset",
			content: markdownPreset,
		});
		const leaf = app.workspace.getLeaf("split", "horizontal");
		await leaf.openFile(newFile);
	} else if (mode === "update") {
		let presetToSave: GraphSettings;
		if (group) {
			const pickedGroup = pickGroup(group, preset);
			const existingPreset = await actions.getPreset({
				created: (file as TFile).stat.ctime,
			});

			presetToSave = {
				...existingPreset,
				...pickedGroup,
			} as GraphSettings;
		} else presetToSave = preset as GraphSettings;
		const markdownPreset = mapPresetToMarkdown(presetToSave);
		newFile = await obsidian.fs.updateFile({
			file: file as TFile,
			data: markdownPreset,
		});
	}
};
