import { Command } from "obsidian";
import { loadGraph } from "./callback/load-graph";

export const saveGraph: Command = {
	id: "load-graph",
	name: "load graph",
	callback: () => {
		loadGraph();
	},
};
