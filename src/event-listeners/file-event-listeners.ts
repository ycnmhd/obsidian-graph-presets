import { TFile } from "obsidian";
import { fileIsPreset } from "../helpers/file-is-preset";
import { ac } from "../store/store";

export const fileEvents = [
	/* "create" */ "modify",
	"delete",
	"rename",
] as const;
export type FileEvent = typeof fileEvents[number];

export const fileEventListeners = (event: FileEvent) =>
	app.vault.on(event as any, (file) => {
		if (file instanceof TFile && fileIsPreset(file)) {
			ac.updateFileMeta({
				created: file.stat.ctime,
				eventType: event as FileEvent,
			});
		}
	});
