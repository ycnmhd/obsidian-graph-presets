import { GraphSettings } from "src/types/graph-settings";
export type Preset = {
			settings: GraphSettings;
			meta: {
				created: number;
				updated: number;
			};
		}
export type GraphPresetsSettings = {
	presets: {
		[key: string]: Preset;
	};
};

export const DEFAULT_SETTINGS: GraphPresetsSettings = {
	presets: {},
};
