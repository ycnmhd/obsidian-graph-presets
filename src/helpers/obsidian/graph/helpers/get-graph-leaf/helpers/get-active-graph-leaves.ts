export const getActiveGraphLeaves = () => {
	const globalGraphs = app.workspace.getLeavesOfType("graph");
	const localGraphs = app.workspace.getLeavesOfType("localgraph");
	return [...globalGraphs, ...localGraphs];
};
