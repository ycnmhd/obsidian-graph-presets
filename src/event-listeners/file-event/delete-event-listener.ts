import { TFile } from "obsidian";
import { fileIsPreset } from "src/helpers/file-is-preset";
import { ac } from "src/store/store";

export const deleteEventListener = () =>
	app.vault.on("delete", (file) => {
		if (file instanceof TFile && fileIsPreset(file)) {
			ac.updateFileMeta({
				created: file.stat.ctime,
				eventType: "delete",
			});
		}
	});
