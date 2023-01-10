import { TFile } from "obsidian";
import { fileIsPreset } from "../../helpers/file-is-preset";
import { ac } from "../../store/store";

export const renameEventListener = () =>
	app.vault.on("rename", (file) => {
		if (file instanceof TFile && fileIsPreset(file)) {
			ac.updateFileMeta({
				created: file.stat.ctime,
				eventType: "rename",
			});
		}
	});
