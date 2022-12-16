import { GraphSettings } from "src/types/graph-settings";

export type PluginSettings = {
	presets: {
		[key: string]: GraphSettings;
	};
};

export const DEFAULT_SETTINGS: PluginSettings = {
	presets: {},
};
