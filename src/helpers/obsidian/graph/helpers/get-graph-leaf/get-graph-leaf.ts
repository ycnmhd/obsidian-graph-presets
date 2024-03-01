import { WorkspaceLeaf } from "obsidian";
import { GetPresetDTO } from "src/helpers/get-preset";
import { getSnapshot } from "src/store/store";
import { getOpenLocalGraphLeaf } from "./helpers/get-open-local-graph-leaf";
import { getOpenGraphLeaf } from "./helpers/get-open-graph-leaf";

export const getGraphLeaf = async (dto: GetPresetDTO) => {
	let leaf: WorkspaceLeaf | undefined;
	const store = getSnapshot();
	const presetMeta = store.presets.meta[dto?.created];
	const localGraphFile = dto ? presetMeta?.localGraphFile : undefined;
	if (localGraphFile) {
		leaf = getOpenLocalGraphLeaf(localGraphFile);
	} else if (presetMeta.target === "local") {
		const file = app.workspace.getActiveFile();
		if (file) leaf = getOpenLocalGraphLeaf(file?.stat.ctime);
	} else {
		leaf = await getOpenGraphLeaf(dto);
	}
	if (leaf) {
		app.workspace.revealLeaf(leaf);
	}
	return leaf;
};
