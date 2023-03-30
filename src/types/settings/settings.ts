export type PersistedPresetMeta = {
	applied?: number;
	disableAutoApply?: boolean;
	localGraphFile?: number;
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
		presets: {
			[key: string]: PersistedPresetMeta;
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
		restoreZoom: boolean;
		restoreCollapsedState: boolean;
		globalFilter: string;
	};
};

export const CURRENT_VERSION = "0.8.0";

export const DEFAULT_SETTINGS: PluginSettings = {
	version: undefined,

	data: {
		presets: {},
	},
	preferences: {
		sortBy: "presetNameAsc",
		presetsFolder: "graph presets",
		markdownPresets: {
			inlineSearchQuery: false,
			inlineColorGroups: false,
		},
		enablePresetCommands: false,
		restoreZoom: true,
		restoreCollapsedState: false,
		globalFilter: "",
	},
};
