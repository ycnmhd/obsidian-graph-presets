import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import {
	CURRENT_VERSION,
	DEFAULT_SETTINGS,
	PluginSettings,
} from "src/types/settings/settings";
import { GraphPresets } from "src/graph-presets";
import { migrations } from "./migrate-settings";
import { PluginSettings_040 } from "src/types/settings/040";
import { PluginSettings_050 } from "src/types/settings/050";

export const loadSettings = async (
	dispatch: ThunkDispatch<unknown, unknown, AnyAction>
): Promise<PluginSettings> => {
	let savedSettings = await GraphPresets.getInstance().loadData();
	if (savedSettings) {
		if (savedSettings.version !== CURRENT_VERSION) {
			if (!savedSettings.version) {
				savedSettings = await migrations["0.5.0"](
					savedSettings as unknown as PluginSettings_040,
					dispatch
				);
			}
			if (savedSettings.version === "0.5.0") {
				savedSettings = await migrations["0.8.0"](
					savedSettings as unknown as PluginSettings_050
				);
			}
		}
	} else {
		savedSettings = {
			...DEFAULT_SETTINGS,
			version: CURRENT_VERSION,
		};
	}
	return savedSettings;
};
