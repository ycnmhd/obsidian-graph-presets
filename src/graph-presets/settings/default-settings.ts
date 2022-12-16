import { GraphSettings } from "src/types/graph-settings";

export type GraphPresetsSettings = {
	presets: {
		[key: string]: {
			settings: GraphSettings;
			meta: {
				created: number;
				updated: number;
			};
		};
	};
};

export const DEFAULT_SETTINGS: GraphPresetsSettings = {
	presets: {},
};
