import { GraphSettings } from "src/types/graph-settings";
import { parseInlinePreset } from "./parse-inline-preset/parse-inline-preset";
import { parseYamlPreset } from "./parse-yaml-preset/parse-yaml-preset";

export const parseMarkDownPreset = (preset: string): Partial<GraphSettings> => {
	return {
		...parseYamlPreset(preset),
		...parseInlinePreset(preset),
	};
};
