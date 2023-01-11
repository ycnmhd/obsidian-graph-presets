import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	DEFAULT_SETTINGS,
	PluginSettings,
	SortMode,
} from "src/types/settings/settings";

export type PreferencesSlice = PluginSettings["preferences"] & {
	filter: string;
};

const initialState: PreferencesSlice = {
	...DEFAULT_SETTINGS.preferences,
	filter: "",
};

export const preferencesSlice = createSlice({
	name: "preferences",
	initialState,
	reducers: {
		loadSettings: (state, action: PayloadAction<PluginSettings>) => {
			state.enablePresetCommands =
				action.payload.preferences.enablePresetCommands;
			state.markdownPresets = action.payload.preferences.markdownPresets;
			state.presetsFolder = action.payload.preferences.presetsFolder;
			state.sortBy = action.payload.preferences.sortBy;
		},
		setPresetsFolder: (state, action: PayloadAction<string>) => {
			state.presetsFolder = action.payload;
		},
		setEnablePresetCommands: (state, action: PayloadAction<boolean>) => {
			state.enablePresetCommands = action.payload;
		},
		setSortBy: (state, action: PayloadAction<SortMode>) => {
			state.sortBy = action.payload;
		},

		setFilter: (state, action: PayloadAction<string>) => {
			state.filter = action.payload;
		},
	},
});
