import { WorkspaceLeaf } from "obsidian";
import { getActiveGraphLeaves } from "./helpers/get-active-graph-leaves";
import { GraphSelectionModal } from "../../../../../modals/graph-selecton-modal/graph-selecton-modal";
import { GetPresetDTO } from "src/helpers/get-preset";

const previouslySelected: Map<number, WorkspaceLeaf> = new Map();

export const getGraphLeaf = async (dto: GetPresetDTO | null) => {
	let leaf: WorkspaceLeaf | null = null;
	const graphLeaves = getActiveGraphLeaves();
	if (graphLeaves.length > 1) {
		if (dto && previouslySelected.has(dto.created)) {
			const previousLeaf = previouslySelected.get(
				dto.created
			) as WorkspaceLeaf;
			if (getActiveGraphLeaves().includes(previousLeaf)) {
				leaf = previousLeaf;
			} else {
				previouslySelected.delete(dto.created);
			}
		} else {
			const modal = new GraphSelectionModal();
			modal.open();
			leaf = await modal.selected;
			modal.close();
			if (dto) {
				previouslySelected.set(dto.created, leaf);
			}
		}
	} else if (graphLeaves.length === 1) {
		leaf = graphLeaves[0];
	}
	if (leaf) app.workspace.revealLeaf(leaf);
	return leaf;
};
