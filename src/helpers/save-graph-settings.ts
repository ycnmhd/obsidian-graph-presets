import { GraphSettings } from "src/types/graph-settings";

export const saveGraphSettings = async (
	settings: GraphSettings
): Promise<void> => {
	const graph = (app as any).internalPlugins.plugins.graph;
	const graphIsOpen = app.workspace.getLeavesOfType("graph").length > 0;
	app.workspace.detachLeavesOfType("graph");
	await graph.saveData(settings);
	await graph.disable();
	await graph.enable();
	if (graphIsOpen) {
		await new Promise((res) => setTimeout(res, 300));
		(app as any).commands.commands["graph:open"].callback();
	}
};
