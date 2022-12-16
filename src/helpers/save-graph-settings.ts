import { GraphSettings } from "src/types/graph-settings";

export const saveGraphSettings = async (
	settings: GraphSettings
): Promise<void> => {
	const graph = (app as any).internalPlugins.plugins.graph;
	app.workspace.detachLeavesOfType("graph");
	await graph.saveData(settings);
	await graph.disable();
	await graph.enable();
};
