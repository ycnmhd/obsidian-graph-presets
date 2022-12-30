export type PersistedPresetMeta = {
	meta: {
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

export type PluginSettings = {
	data: {
		presetsMeta: {
			[key: string]: PersistedPresetMeta;
		};
	};
	preferences: {
		sortBy: SortMode;
		presetsFolder: "documents/graph presets";
		markdownPresets: {
			inlineSearchQuery: boolean;
			inlineColorGroups: boolean;
		};
	};
};

export const DEFAULT_SETTINGS: PluginSettings = {
	data: {
		presetsMeta: {},
	},
	preferences: {
		sortBy: "presetNameAsc",
		presetsFolder: "documents/graph presets",
		markdownPresets: {
			inlineSearchQuery: true,
			inlineColorGroups: true,
		},
	},
};
