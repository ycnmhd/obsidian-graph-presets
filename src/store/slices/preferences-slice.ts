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
			const preferences = action.payload.preferences;
			state.enablePresetCommands = preferences.enablePresetCommands;
			state.markdownPresets = preferences.markdownPresets;
			state.presetsFolder = preferences.presetsFolder;
			state.sortBy = preferences.sortBy;
			state.restoreZoom = preferences.restoreZoom;
			state.restoreCollapsedState = preferences.restoreCollapsedState;
			state.globalFilter = preferences.globalFilter || "";
			state.autoApplyPreset = preferences.autoApplyPreset;
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
		setRestoreZoom: (state, action: PayloadAction<boolean>) => {
			state.restoreZoom = action.payload;
		},
		setRestoreCollapsedState: (state, action: PayloadAction<boolean>) => {
			state.restoreCollapsedState = action.payload;
		},
		setGlobalFilter: (state, action: PayloadAction<string>) => {
			state.globalFilter = action.payload.trim();
		},
		setAutoApplyPreset: (state, action: PayloadAction<boolean>) => {
			state.autoApplyPreset = action.payload;
		},
	},
});
