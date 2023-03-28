import { WorkspaceLeaf } from "obsidian";
import { GetPresetDTO } from "src/helpers/get-preset";
import { GraphSelectionModal } from "src/modals/graph-selecton-modal/graph-selecton-modal";
import { getActiveGraphLeaves } from "./get-active-graph-leaves";

const previouslySelected: Map<number, WorkspaceLeaf> = new Map();

export const getOpenGraphLeaf = async (dto: GetPresetDTO | null) => {
	let leaf: WorkspaceLeaf | undefined;
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
		}
		if (!leaf) {
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
	return leaf;
};
