import { getGraphSettings } from "./get-graph-settings";
import { applyGraphSettings } from "./apply-graph-settings";
import { setGraphSettings } from "./set-graph-settings";

export const obsidian = {
	setGraphSettings,
	getGraphSettings,
	openGraphView: async () => {
		(app as any).commands.commands["graph:open"].callback();
		await new Promise((resolve) => setTimeout(resolve, 2000));
	},
	applyGraphSettings,
};
