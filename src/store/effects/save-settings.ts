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
			restoreZoom: store.preferences.restoreZoom,
			restoreCollapsedState: store.preferences.restoreCollapsedState,
			globalFilter: store.preferences.globalFilter,
			autoApplyPreset: store.preferences.autoApplyPreset,
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
								...(value.localGraphFile && {
									localGraphFile: value.localGraphFile,
								}),
								target: value.target,
							} satisfies PersistedPresetMeta,
						] as const;
					})
					.filter(
						([, p]) => p.applied || p.localGraphFile || p.target
					)
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
		acu.updateFileMeta,
		acu.setLocalFile,
		acu.createPreset.fulfilled,
		acu.applyPreset.fulfilled,
		acu.setRestoreZoom,
		acu.setRestoreCollapsedState,
		acu.setGlobalFilter,
		acu.setPresetTarget,
		acu.setAutoApplyPreset
	),
	effect: saveSettings,
});

export const saveSettingsMiddleware = listenerMiddleware.middleware;
