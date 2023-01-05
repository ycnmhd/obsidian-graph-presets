import { WorkspaceLeaf } from "obsidian";
import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";
import { obsidian } from "src/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { getGraphLeaf } from "../get-graph-leaf/get-graph-leaf";
import { setGraphSettingsToView } from "./set-graph-settings-to-view";

export const setGraphSettings = async (
	settings: Partial<GraphSettings>,
	group?: graphSettingsGroup,
	openGraph = true
) => {
	let leaf: WorkspaceLeaf | null = null;
	leaf = await getGraphLeaf();
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
	await setGraphSettingsToView(leaf, settings, group);
};
