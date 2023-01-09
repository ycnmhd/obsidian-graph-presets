import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { TFile } from "obsidian";
import {
	getAbstractFileByPathAsync,
	getFileCacheAsync,
} from "src/helpers/create-async-getter";
import { Router } from "src/views/preset/helpers/router";
import { acu } from "../ac";
import { openPreset } from "../../helpers/open-preset";

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
			await openPreset(
				{
					created: payload.created,
				},
				true
			);
		}
	},
});

export const openCreatedFileMiddleware = listenerMiddleware.middleware;
