import { GraphSettings } from "src/types/graph-settings";
export type Preset = {
	settings: GraphSettings;
	meta: {
		created: number;
		updated: number;
		applied: number;
	};
};

export type SortMode =
	| "presetNameAsc"
	| "presetNameDesc"
	| "dateCreatedAsc"
	| "dateCreatedDesc"
	| "dateModifiedAsc"
	| "dateModifiedDesc"
	| "dateAppliedAsc"
	| "dateAppliedDesc";

export type GraphPresetsSettings = {
	presets: {
		[key: string]: Preset;
	};
	preferences: {
		sortBy: SortMode;
		presetsFolder: "documents/graph presets"
	};
};

export const DEFAULT_SETTINGS: GraphPresetsSettings = {
	presets: {},
	preferences: {
		sortBy: "presetNameAsc",
		presetsFolder: "documents/graph presets",
	},
};
