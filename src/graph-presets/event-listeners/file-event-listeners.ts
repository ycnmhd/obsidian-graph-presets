import { TFile, TFolder } from "obsidian";
import { fileIsPresetAsync } from "../helpers/file-is-preset";
import { ac, getSnapshot } from "../store/store";

export const fileEvents = ["create", "modify", "delete", "rename"] as const;
export type FileEvent = typeof fileEvents[number];

export const fileEventListeners = (event: FileEvent) =>
	app.vault.on(event as any, async (file) => {
		if (file instanceof TFile) {
			let isPreset;
			if (event === "delete") {
				isPreset = !!getSnapshot().presets.meta[file.stat.ctime];
			} else {
				isPreset = fileIsPresetAsync(file);
			}

			if (isPreset) {
				ac.updateFileMeta({
					created: file.stat.ctime,
					eventType: event as FileEvent,
					updated: file.stat.mtime,
					name: file.basename,
					path: file.path,
				});
			}
		} else if (file instanceof TFolder) {
			ac.refreshCache();
		}
	});
