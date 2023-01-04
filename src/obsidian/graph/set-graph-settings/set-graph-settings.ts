import { WorkspaceLeaf } from "obsidian";
import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";
import { obsidian } from "src/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { getGraphLeaf } from "../get-graph-leaf/get-graph-leaf";
import { setGraphSettingsToView } from "./set-graph-settings-to-view";

export const setGraphSettings = async (
	settings: Partial<GraphSettings>,
	group?: graphSettingsGroup
) => {
	let leaf: WorkspaceLeaf | null = null;
	leaf = await getGraphLeaf();
	if (!leaf) {
		await obsidian.graph.open();
		leaf = app.workspace.getLeavesOfType("graph")[0];
	}
	app.workspace.revealLeaf(leaf);
	await setGraphSettingsToView(leaf, settings, group);
};
