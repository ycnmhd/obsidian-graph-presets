import { GraphSettings } from "src/types/graph-settings";

export const getSavedGraphSettings = async (): Promise<GraphSettings> => {
	const graph = (app as any).internalPlugins.plugins.graph;
	return await graph.loadData();
};
