/* eslint-disable no-mixed-spaces-and-tabs */
import { TFile } from "obsidian";
import { getSnapshot } from "src/graph-presets/store/store";
import { obsidian } from "src/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { actions } from "../actions";
import { graphSettingsGroup } from "../../../types/apply-preset";
import { GetPresetDTO } from "../get-preset";
import { mapPresetToMarkdown } from "./helpers/map-preset-to-markdown";
import { mergeWithExistingPreset } from "./helpers/merge-with-existing-preset";
import { filesByCtime } from "src/graph-presets/store/cache/files-by-time";

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
		presetToSave = (await obsidian.graph.getSettings({
			dto,
		})) as GraphSettings;
	} else if (mode === "group-from-graph" && "group" in props) {
		const existingPreset = await actions.getPreset(dto);
		presetToSave = {
			...existingPreset,
			...(await obsidian.graph.getSettings({
				group: props.group,
				dto,
			})),
		} as GraphSettings;
	} else if (mode === "partial-from-props" && "props" in props) {
		const existingPreset = await actions.getPreset(dto);
		presetToSave = {
			...existingPreset,
			...props.props,
		} as GraphSettings;
	}

	if (presetToSave) {
		const store = getSnapshot();
		const file = filesByCtime.current[dto.created];
		const markdownPreset = mapPresetToMarkdown(
			await mergeWithExistingPreset(presetToSave, dto),
			store.preferences.markdownPresets
		);
		const newFile = await obsidian.fs.updateFile({
			file: file as TFile,
			data: markdownPreset,
		});
		return newFile;
	}
};
