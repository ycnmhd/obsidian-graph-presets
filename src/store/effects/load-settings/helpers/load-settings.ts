import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import {
	CURRENT_VERSION,
	DEFAULT_SETTINGS,
	PluginSettings,
} from "src/types/settings/settings";
import { GraphPresets } from "src/graph-presets";

export const loadSettings = async (
	dispatch: ThunkDispatch<unknown, unknown, AnyAction>
): Promise<PluginSettings> => {
	let savedSettings = await GraphPresets.getInstance().loadData();
	if (!savedSettings) {
		savedSettings = {
			...DEFAULT_SETTINGS,
			version: CURRENT_VERSION,
		};
	}
	return savedSettings;
};
