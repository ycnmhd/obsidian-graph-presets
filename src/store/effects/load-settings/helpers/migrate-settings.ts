import { PluginSettings_040 } from "src/types/settings/040";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import {
	DEFAULT_SETTINGS_050,
	PluginSettings_050,
} from "src/types/settings/050";
import { getSnapshot } from "src/store/store";
import { acu } from "src/store/ac";
import { getAbstractFileByPathAsync } from "src/helpers/create-async-getter";
import { Notice, TFile } from "obsidian";
import { t } from "src/lang/text";
import { PluginSettings } from "src/types/settings/settings";

export const migrations = {
	"0.5.0": async (
		oldSettings: PluginSettings_040,
		dispatch: ThunkDispatch<unknown, unknown, AnyAction>
	): Promise<PluginSettings_050> => {
		const store = getSnapshot();

		const presets = oldSettings.presets || {};

		const folderPath = store.preferences.presetsFolder + "/migrated/0.5.0";
		for (const [name, preset] of Object.entries(presets)) {
			dispatch(
				acu.createPreset({
					presetName: name,
					preset: preset.settings,
					folderPath,
					dontOpenAfterCreation: true,
				})
			);
			const file = await getAbstractFileByPathAsync(
				folderPath + "/" + name
			);
			if (file instanceof TFile) preset.meta.created = file.stat.ctime;
		}
		new Notice(t.c.PRESETS_MIGRATED);

		return {
			version: "0.5.0",
			preferences: {
				...DEFAULT_SETTINGS_050.preferences,
				sortBy: oldSettings.preferences.sortBy,
			},
			data: {
				presetsMeta: Object.fromEntries(
					Object.values(presets).map((preset) => {
						return [
							preset.meta.created,
							{
								meta: {
									applied: preset.meta.applied,
									disableAutoApply: false,
								},
							},
						];
					})
				),
			},
		};
	},
	"0.8.0": async (
		oldSettings: PluginSettings_050
	): Promise<PluginSettings> => {
		return {
			version: "0.8.0",
			preferences: {
				...oldSettings.preferences,
				restoreZoom: true,
				restoreCollapsedState: false,
				globalFilter: "",
				disableAutoBindToLocalGraph: false,
			},
			data: {
				presets: Object.fromEntries(
					Object.entries(oldSettings.data.presetsMeta).map(
						([key, value]) => {
							return [key, value.meta];
						}
					)
				),
			},
		};
	},
};
