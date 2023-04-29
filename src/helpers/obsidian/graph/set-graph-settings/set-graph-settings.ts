import { WorkspaceLeaf } from "obsidian";
import { graphSettingsGroup } from "src/types/apply-preset";
import { GetPresetDTO } from "src/helpers/get-preset";
import { obsidian } from "src/helpers/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { getGraphLeaf } from "../helpers/get-graph-leaf/get-graph-leaf";
import { setGraphSettingsToView } from "./set-graph-settings-to-view";
import { RootState, store } from "src/store/store";

type Props = {
	settings: Partial<GraphSettings>;
	group?: graphSettingsGroup;
	openGraph?: boolean;
	dto: GetPresetDTO;
};
export const setGraphSettings = async ({
	settings,
	group,
	openGraph = true,
	dto,
}: Props) => {
	const state = store.getState() as RootState;
	let leaf: WorkspaceLeaf | undefined;
	leaf = await getGraphLeaf(dto);
	if (!leaf) {
		if (!openGraph) {
			return;
		}

		const localGraphFile = state.presets.meta[dto.created].localGraphFile;
		leaf = await obsidian.graph.open(localGraphFile);
	}
	if (settings.search) {
		settings.search = settings.search?.replace(/\n/g, " ");
		if (state.preferences.globalFilter) {
			settings.search = `${settings.search.trim()} ${
				state.preferences.globalFilter
			}`;
		}
	}
	if (settings.colorGroups) {
		settings.colorGroups = settings.colorGroups?.map((c) => ({
			...c,
			query: c.query.replace(/\n/g, " "),
		}));
	}
	app.workspace.revealLeaf(leaf);
	await setGraphSettingsToView({ leaf, settings, group });
};
