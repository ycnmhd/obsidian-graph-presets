import { Command } from "obsidian";


export const openGraphPresetsView: Command = {
	id: "open-graph-presets-view",
	name: "Open",
	callback: async () => {
		const existingLeaf = app.workspace.getLeavesOfType(
			GraphPresetsItemViewType
		)[0];
		if (existingLeaf) {
			app.workspace.revealLeaf(existingLeaf);
		} else {
			const newLeaf = app.workspace.getLeftLeaf(false);
			await newLeaf.setViewState({
				type: GraphPresetsItemViewType,
			});
			app.workspace.revealLeaf(newLeaf);
		}
	},
};
