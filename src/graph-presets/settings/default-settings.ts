export type PersistedPresetMeta = {
	applied: number;
	disableAutoApply: boolean;
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

export type PluginSettings = {
	version: string | undefined;
	data: {
		presetsMeta: {
			[key: string]: {
				meta: PersistedPresetMeta;
			};
		};
	};
	preferences: {
		sortBy: SortMode;
		presetsFolder: string;
		markdownPresets: {
			inlineSearchQuery: boolean;
			inlineColorGroups: boolean;
		};
		enablePresetCommands: boolean;
	};
};

export const CURRENT_VERSION = "0.5.0";

export const DEFAULT_SETTINGS: PluginSettings = {
	version: undefined,

	data: {
		presetsMeta: {},
	},
	preferences: {
		sortBy: "presetNameAsc",
		presetsFolder: "graph presets",
		markdownPresets: {
			inlineSearchQuery: false,
			inlineColorGroups: false,
		},
		enablePresetCommands: true,
	},
};
