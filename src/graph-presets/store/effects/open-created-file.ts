import { createListenerMiddleware } from "@reduxjs/toolkit";
import { TFile } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";
import { getFileCache } from "src/graph-presets/helpers/get-file-cache";
import { Router } from "src/graph-presets/views/preset/helpers/router";
import { acu } from "../ac";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	actionCreator: acu.updateFileMeta,
	effect: async ({ payload }) => {
		if (payload.eventType !== "create") return;
		Router.getInstance().setFileType({
			path: payload.path,
			type: Router.getInstance().viewType,
		});

		const newFile = app.vault.getAbstractFileByPath(payload.path) as TFile;
		await getFileCache(newFile);
		await actions.openFile(
			{
				created: payload.created,
			},
			true
		);
	},
});

export const openCreatedFileMiddleware = listenerMiddleware.middleware;
