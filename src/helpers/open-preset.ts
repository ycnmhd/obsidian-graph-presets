import { TFile } from "obsidian";
import { obsidian } from "src/helpers/obsidian/obsidian";
import { filesByCtime } from "../store/cache/files-by-time";
import { GetPresetDTO } from "./get-preset";

export const openPreset = async (
	dto: GetPresetDTO | { file: TFile },
	newLeaf = false
) => {
	const file = "file" in dto ? dto.file : filesByCtime.current[dto.created];
	await obsidian.fs.openFile({
		file,
		position: newLeaf
			? "right-new-leaf"
			: app.workspace.getLeaf().view.getViewType() === "graph"
			? "right-replace-adjacent-leaf"
			: undefined,
	});
};
