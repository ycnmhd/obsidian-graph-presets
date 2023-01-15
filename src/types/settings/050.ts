export type PluginSettings_050 = {
	version: string | undefined;
	data: {
		presetsMeta: {
			[key: string]: {
				meta: {
					applied: number;
					disableAutoApply: boolean;
				};
			};
		};
	};
	preferences: {
		sortBy:
			| "presetNameAsc"
			| "presetNameDesc"
			| "dateCreatedAsc"
			| "dateCreatedDesc"
			| "dateModifiedAsc"
			| "dateModifiedDesc"
			| "dateAppliedAsc"
			| "dateAppliedDesc";
		presetsFolder: string;
		markdownPresets: {
			inlineSearchQuery: boolean;
			inlineColorGroups: boolean;
		};
		enablePresetCommands: boolean;
	};
};

export const DEFAULT_SETTINGS_050: PluginSettings_050 = {
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
