import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";
import { pickGroup } from "src/graph-presets/actions/helpers/pick-group";
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