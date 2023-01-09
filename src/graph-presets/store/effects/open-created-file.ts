import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { TFile } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";
import {
	getAbstractFileByPathAsync,
	getFileCacheAsync,
} from "src/graph-presets/helpers/create-async-getter";
import { Router } from "src/graph-presets/views/preset/helpers/router";
import { acu } from "../ac";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	matcher: isAnyOf(acu.createPreset.fulfilled, acu.duplicatePreset.fulfilled),
	effect: async ({ payload }) => {
		if (payload.dontOpenAfterCreation) return;
		Router.getInstance().setFileType({
			path: payload.path,
			type: Router.getInstance().viewType,
		});
		const file = await getAbstractFileByPathAsync(payload.path);
		if (file) {
			await getFileCacheAsync(file as TFile);
			await actions.openFile(
				{
					created: payload.created,
				},
				true
			);
		}
	},
});

export const openCreatedFileMiddleware = listenerMiddleware.middleware;
