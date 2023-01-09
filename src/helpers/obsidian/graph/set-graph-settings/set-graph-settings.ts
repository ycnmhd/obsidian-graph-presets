import { WorkspaceLeaf } from "obsidian";
import { graphSettingsGroup } from "src/types/apply-preset";
import { GetPresetDTO } from "src/helpers/get-preset";
import { obsidian } from "src/helpers/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { getGraphLeaf } from "../helpers/get-graph-leaf/get-graph-leaf";
import { setGraphSettingsToView } from "./set-graph-settings-to-view";

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
	let leaf: WorkspaceLeaf | null = null;
	leaf = await getGraphLeaf(dto);
	if (!leaf) {
		if (!openGraph) {
			return;
		}
		await obsidian.graph.open();
		leaf = app.workspace.getLeavesOfType("graph")[0];
	}
	settings.search = settings.search?.replace(/\n/g, " ");
	settings.colorGroups = settings.colorGroups?.map((c) => ({
		...c,
		query: c.query.replace(/\n/g, " "),
	}));
	app.workspace.revealLeaf(leaf);
	await setGraphSettingsToView({ leaf, settings, group });
};
