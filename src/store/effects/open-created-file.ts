import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { TFile } from "obsidian";
import {
	getAbstractFileByPathAsync,
	getFileCacheAsync,
} from "src/helpers/create-async-getter";
import { Router } from "src/views/preset/helpers/router";
import { acu } from "../ac";
import { openPreset } from "src/helpers/open-preset";
import { mapPresetToCommand } from "src/commands/apply-graph-preset";
import { RootState } from "src/store/store";
import { GraphPresets } from "src/graph-presets";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	matcher: isAnyOf(acu.createPreset.fulfilled, acu.duplicatePreset.fulfilled),
	effect: async ({ payload }, api) => {
		if (payload.dontOpenAfterCreation) return;
		Router.getInstance().setFileType({
			path: payload.path,
			type: Router.getInstance().viewType,
		});
		const file = await getAbstractFileByPathAsync(payload.path);
		if (file) {
			await getFileCacheAsync(file as TFile);
			await openPreset(
				{
					created: payload.created,
				},
				true
			);
			const store = api.getState() as RootState;
			if(store.preferences.enablePresetCommands){
				const meta = store.presets.meta[payload.created];
				const command = mapPresetToCommand(meta);
				GraphPresets.getInstance().addCommand(command);
			}
		}
	},
});

export const openCreatedFileMiddleware = listenerMiddleware.middleware;
