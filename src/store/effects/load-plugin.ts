import { createListenerMiddleware } from "@reduxjs/toolkit";
import { acu } from "../ac";
import { GraphPresets } from "../../graph-presets";

const listenerMiddleware = createListenerMiddleware();

const effect = async () => {
	await GraphPresets.getInstance().deferredLoad();
	listenerMiddleware.stopListening({
		actionCreator: acu.refreshCache.fulfilled,
		effect,
		cancelActive: true,
	});
};

listenerMiddleware.startListening({
	actionCreator: acu.refreshCache.fulfilled,
	effect: effect,
});

export const loadPluginMiddleware = listenerMiddleware.middleware;
