import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";
import { getGraphSettingsFromView } from "./get-graph-settings-from-view";
import { GraphSettings } from "src/types/graph-settings";
import { getSavedGraphSettings } from "src/obsidian/graph/get-graph-settings/get-saved-graph-settings";
import { getGraphLeaf } from "../get-graph-leaf/get-graph-leaf";

export const getGraphSettings = async (group?: graphSettingsGroup) => {
	let settings: GraphSettings| Partial<GraphSettings>;
	const leaf = await getGraphLeaf();
	if (leaf) {
		settings = getGraphSettingsFromView({ leaf, group });
	} else {
		settings = await getSavedGraphSettings(group);
	}
	return settings;
};
