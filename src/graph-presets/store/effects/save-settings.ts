import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
	PersistedPresetMeta,
	PluginSettings,
} from "src/graph-presets/settings/default-settings";
import GraphPresets from "src/main";
import { acu } from "../ac";
import { getSnapshot, RootState } from "../store";

const mapStoreToSettings = (
	store: RootState
): Omit<PluginSettings, "version"> => {
	return {
		preferences: {
			enablePresetCommands: store.preferences.enablePresetCommands,
			presetsFolder: store.preferences.presetsFolder,
			sortBy: store.preferences.sortBy,
			markdownPresets: store.preferences.markdownPresets,
		},
		data: {
			presetsMeta: Object.fromEntries(
				Object.entries(store.presets.meta).map(([key, value]) => {
					return [
						key,
						{
							meta: {
								applied: value.applied,
								disableAutoApply: value.disableAutoApply,
							} satisfies PersistedPresetMeta,
						},
					];
				})
			),
		},
	};
};

const saveSettings = async () => {
	const plugin = GraphPresets.getInstance();
	plugin.saveData({
		...plugin.settings,
		...mapStoreToSettings(getSnapshot()),
	});
};

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	matcher: isAnyOf(
		acu.setPresetsFolder,
		acu.setEnablePresetCommands,
		acu.setSortBy,
		acu.toggleAutoApply,
		acu.applyPreset.fulfilled
	),
	effect: saveSettings,
});

export const settingsMiddleware = listenerMiddleware.middleware;
