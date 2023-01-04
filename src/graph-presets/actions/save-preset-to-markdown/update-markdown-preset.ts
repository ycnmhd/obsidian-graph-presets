/* eslint-disable no-mixed-spaces-and-tabs */
import { TFile } from "obsidian";
import GraphPresets from "src/main";
import { obsidian } from "src/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { actions } from "../actions";
import { graphSettingsGroup } from "../apply-preset";
import { GetPresetDTO } from "../get-preset";
import { pickGroup } from "../helpers/pick-group";
import { mapPresetToMarkdown } from "./helpers/map-preset-to-markdown";
import { mergeWithExistingPreset } from "./helpers/merge-with-existing-preset";

type Props = { dto: GetPresetDTO } & (
	| {
			mode: "partial-from-props";
			props: Partial<GraphSettings>;
	  }
	| {
			mode: "group-from-graph";
			group: graphSettingsGroup;
	  }
	| {
			mode: "full-from-graph";
	  }
);

export const updateMarkdownPreset = async ({ dto, mode, ...props }: Props) => {
	let presetToSave: GraphSettings | undefined;
	if (mode === "full-from-graph") {
		presetToSave = await obsidian.graph.getSettings();
	} else if (mode === "group-from-graph" && "group" in props) {
		const group = props.group;
		const currentPreset = await obsidian.graph.getSettings();
		const pickedGroup = pickGroup(group, currentPreset);
		const existingPreset = await actions.getPreset(dto);
		presetToSave = {
			...existingPreset,
			...pickedGroup,
		} as GraphSettings;
	} else if (mode === "partial-from-props" && "props" in props) {
		const existingPreset = await actions.getPreset(dto);
		presetToSave = {
			...existingPreset,
			...props.props,
		} as GraphSettings;
	}

	const plugin = GraphPresets.getInstance();

	if (presetToSave) {
		const file = await plugin.store.getSnapshot().state.filesByCtime[
			dto.created
		];
		const markdownPreset = mapPresetToMarkdown(
			await mergeWithExistingPreset(presetToSave, dto),
			plugin.settings.preferences.markdownPresets
		);
		const newFile = await obsidian.fs.updateFile({
			file: file as TFile,
			data: markdownPreset,
		});
		return newFile;
	}
};
