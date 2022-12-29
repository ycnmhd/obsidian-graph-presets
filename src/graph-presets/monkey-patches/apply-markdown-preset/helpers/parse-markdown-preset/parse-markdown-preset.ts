import { ColorGroup, GraphSettings } from "src/types/graph-settings";
import { parseInlinePreset } from "./parse-inline-preset/parse-inline-preset";
import { parseYamlPreset } from "./parse-yaml-preset/parse-yaml-preset";

export const parseMarkDownPreset = (preset: string): Partial<GraphSettings> => {
	const yamlPreset = parseYamlPreset(preset);
	const inlinePreset = parseInlinePreset(preset);
	const search = [yamlPreset.search, inlinePreset.search]
		.filter(Boolean)
		.join(" ");
	const colorGroups = [inlinePreset.colorGroups, yamlPreset.colorGroups]
		.flat()
		.filter(Boolean) as ColorGroup[];
	return {
		...yamlPreset,
		...inlinePreset,
		search,
		colorGroups,
	};
};
