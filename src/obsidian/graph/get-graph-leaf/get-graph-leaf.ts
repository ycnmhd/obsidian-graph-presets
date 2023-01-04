import { WorkspaceLeaf } from "obsidian";
import { getActiveGraphLeaves } from "./helpers/get-active-graph-leaves";
import { GraphSelectionModal } from "../../../graph-presets/modals/graph-selecton-modal/graph-selecton-modal";

export const getGraphLeaf = async () => {
	let leaf: WorkspaceLeaf | null = null;
	const graphLeaves = getActiveGraphLeaves();
	if (graphLeaves.length > 1) {
		const modal = new GraphSelectionModal();
		modal.open();
		leaf = await modal.selected;
		modal.close();
	} else if (graphLeaves.length === 1) {
		leaf = graphLeaves[0];
	}
	return leaf;
};
