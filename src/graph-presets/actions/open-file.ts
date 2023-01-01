import { obsidian } from "src/obsidian/obsidian";
import { GraphPresets } from "../graph-presets";
import { GetPresetDTO } from "./get-preset";

export const openFile = async (dto: GetPresetDTO, newLeaf = false) => {
	const plugin = GraphPresets.getInstance();
	const file = dto.file ||plugin.store.getSnapshot().state.filesByCtime[dto.created];
	plugin.viewManager.setFileBeingOpened(file.path);

	await obsidian.fs.openFile({
		file,
		position: newLeaf
			? "right-new-leaf"
			: app.workspace.getLeaf().view.getViewType() === "graph"
			? "right-replace-adjacent-leaf"
			: undefined,
	});

	plugin.viewManager.unsetFileBeingOpened(file.path);
};
