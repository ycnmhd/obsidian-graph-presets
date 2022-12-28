import { rgbToHex } from "src/graph-presets/components/presets-view/components/presets-list/components/preset/components/preset-preview/groups/helpers/map-colors";
import { PRESET_FRONTMATTER } from "src/graph-presets/helpers/constants";
import { graphSettingsKeys } from "src/graph-presets/helpers/graph-settings-keys";
import { GraphSettings } from "src/types/graph-settings";
import { parseSearchQuery } from "./helpers/parse-search-query";

const inlineFieldSet = new Set(["search", "colorGroups"]);

export const mapPresetToMarkdown = (preset: GraphSettings): string => {
	const lines = [];
	lines.push(PRESET_FRONTMATTER);

	const searchTuples = parseSearchQuery(preset.search);
	for (const [key, value] of searchTuples) {
		lines.push(`${key}:: ${value}`);
	}

	const colorGroups = preset.colorGroups;
	for (const colorGroup of colorGroups) {
		const searchTuples = parseSearchQuery(colorGroup.query);
		for (const [key, value] of searchTuples) {
			const color = rgbToHex(colorGroup.color.rgb);
			lines.push(`${key}:: ${value} | "${color}"`);
		}
	}

	lines.push("");
	lines.push("---");
	lines.push("```yaml:graph-preset");

	for (const group of Object.keys(
		graphSettingsKeys
	) as (keyof typeof graphSettingsKeys)[]) {
		for (const option of graphSettingsKeys[group]) {
			if (!inlineFieldSet.has(option))
				if (preset[option] !== undefined) {
					lines.push(`${option}: ${preset[option]}`);
				}
		}
	}

	lines.push("```");
	lines.push("");
	lines.push("");

	return lines.join("\n");
};
