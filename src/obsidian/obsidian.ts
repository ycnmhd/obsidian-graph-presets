import { getGraphSettings } from "./get-graph-settings";
import { applyGraphSettings } from "./apply-graph-settings";
import { setGraphSettings } from "./set-graph-settings";

export const obsidian = {
	setGraphSettings,
	getGraphSettings,
	openGraphView: () => {
		(app as any).commands.commands["graph:open"].callback();
	},
	applyGraphSettings,
};
