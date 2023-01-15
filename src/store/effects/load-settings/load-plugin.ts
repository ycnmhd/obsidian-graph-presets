import { GraphPresets } from "src/graph-presets";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { acu } from "src/store/ac";
import { loadSettings } from "./helpers/load-settings";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	actionCreator: acu.loadPlugin,
	effect: async (action, api) => {
		const settings = await loadSettings(api.dispatch);
		await GraphPresets.getInstance().setSettings(settings);
		api.dispatch(acu.loadSettings(settings));
		api.dispatch(acu.refreshCache());
		await api.condition(acu.refreshCache.fulfilled.match, 60000);
		await GraphPresets.getInstance().status.setReady(true);
		api.unsubscribe();
	},
});

export const loadPluginMiddleware = listenerMiddleware.middleware;
