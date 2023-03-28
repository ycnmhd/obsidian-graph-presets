import { TFile, WorkspaceLeaf } from "obsidian";
import { GetPresetDTO } from "src/helpers/get-preset";
import { ac, getSnapshot } from "src/store/store";
import { getOpenLocalGraphLeaf } from "./helpers/get-open-local-graph-leaf";
import { getOpenGraphLeaf } from "./helpers/get-open-graph-leaf";

export const getGraphLeaf = async (dto: GetPresetDTO) => {
	let leaf: WorkspaceLeaf | undefined;
	const store = getSnapshot();
	const localGraphFile = dto
		? store.presets.meta[dto?.created]?.localGraphFile
		: undefined;
	if (localGraphFile) {
		leaf = getOpenLocalGraphLeaf(localGraphFile);
	} else {
		leaf = await getOpenGraphLeaf(dto);
	}
	if (leaf) {
		app.workspace.revealLeaf(leaf);
		if (!localGraphFile && leaf.view.getViewType() === "localgraph") {
			const file = (leaf.view as any).file;
			if (file instanceof TFile) {
				ac.setLocalFile({
					created: dto.created,
					localGraphFile: file.stat.ctime,
				});
			}
		}
	}
	return leaf;
};
