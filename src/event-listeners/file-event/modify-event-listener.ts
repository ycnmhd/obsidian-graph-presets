import { TFile } from "obsidian";
import { fileIsPreset } from "src/helpers/file-is-preset";
import { ac } from "src/store/store";

export const modifyEventListener = () =>
	app.vault.on("modify", (file) => {
		if (file instanceof TFile && fileIsPreset(file)) {
			ac.updateFileMeta({
				created: file.stat.ctime,
				eventType: "modify",
			});
		}
	});
