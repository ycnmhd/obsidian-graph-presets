import { graphSettingsGroup } from "src/types/apply-preset";
import { pickGroup } from "src/helpers/obsidian/graph/helpers/pick-group";
import { GraphSettings } from "src/types/graph-settings";

export const getSavedGraphSettings = async (
	group?: graphSettingsGroup
): Promise<GraphSettings | Partial<GraphSettings>> => {
	const graph = (app as any).internalPlugins.plugins.graph;
	const settings = await graph.loadData();
	if (group) {
		return pickGroup(group, settings);
	} else return settings;
};
