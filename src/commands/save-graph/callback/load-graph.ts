export const loadGraph = async () => {
	const graph = (app as any).internalPlugins.plugins.graph;
	const settings = await graph.loadData();
	// settings.colorGroups = [
	// 	{
	// 		query: "#this-is-the-new-query",
	// 		color: {
	// 			a: 1,
	// 			rgb: 16185856,
	// 		},
	// 	},
	// 	{
	// 		query: "#another-new-query",
	// 		color: {
	// 			a: 1,
	// 			rgb: 16187906,
	// 		},
	// 	},
	// ];
	settings.search = Date.now().toString();
	await graph.saveData(settings);
	await graph.disable();	
	await graph.enable();
};
