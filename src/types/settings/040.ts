import { GraphSettings } from "src/types/graph-settings";

export type PluginSettings_040 = {
	presets: {
		[key: string]: {
			settings: GraphSettings;
			meta: {
				created: number;
				updated: number;
				applied: number;
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
	};
};
