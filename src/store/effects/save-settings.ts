import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
	PersistedPresetMeta,
	PluginSettings,
} from "src/types/settings/settings";
import GraphPresets from "src/main";
import { getSnapshot, RootState } from "../store";
import { acu } from "../ac";

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
			presets: Object.fromEntries(
				Object.entries(store.presets.meta)
					.map(([key, value]) => {
						return [
							key,
							{
								...(value.applied && {
									applied: value.applied,
								}),
								...(value.disableAutoApply && {
									disableAutoApply: value.disableAutoApply,
								}),
							} satisfies PersistedPresetMeta,
						] as const;
					})
					.filter(([, p]) => p.disableAutoApply || p.applied)
			),
		},
	};
};

const saveSettings = async () => {
	const plugin = GraphPresets.getInstance();
	await plugin.setSettings({
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

export const saveSettingsMiddleware = listenerMiddleware.middleware;
