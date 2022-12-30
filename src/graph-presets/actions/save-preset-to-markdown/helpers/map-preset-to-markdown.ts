import { stringifyYaml } from "obsidian";
import { rgbToHex } from "src/graph-presets/components/presets-view/components/presets-list/components/preset/components/preset-preview/groups/helpers/map-colors";
import { GraphPresets } from "src/graph-presets/graph-presets";
import { PRESET_FRONTMATTER } from "src/graph-presets/helpers/constants";
import { graphSettingsKeys } from "src/graph-presets/helpers/graph-settings-keys";
import { GraphSettings } from "src/types/graph-settings";
import { parseSearchQuery } from "../../../actions/save-preset-to-markdown/helpers/parse-search-query";

export const mapPresetToMarkdown = (preset: GraphSettings): string => {
	const plugin = GraphPresets.getInstance();
	const inlineColorGroups =
		plugin.settings.preferences.markdownPresets.inlineColorGroups;
	const inlineSearchQuery =
		plugin.settings.preferences.markdownPresets.inlineSearchQuery;
	const lines = [];
	lines.push(PRESET_FRONTMATTER);

	if (inlineSearchQuery) {
		const searchTuples = parseSearchQuery(preset.search);
		for (const [key, value] of searchTuples) {
			lines.push(`${key}:: ${value}`);
		}
	}

	if (inlineColorGroups) {
		const colorGroups = preset.colorGroups;
		for (const colorGroup of colorGroups) {
			const searchTuples = parseSearchQuery(colorGroup.query);
			for (const [key, value] of searchTuples) {
				const color = rgbToHex(colorGroup.color.rgb);
				lines.push(`${key}:: ${value} | "${color}"`);
			}
		}
	}

	lines.push("");
	lines.push("---");
	lines.push("```yaml:graph-preset");

	const entries = [];
	const groups = Object.keys(
		graphSettingsKeys
	) as (keyof typeof graphSettingsKeys)[];
	for (const group of groups) {
		let options;
		if (group === "colorGroupOptions" && inlineColorGroups) {
			options = graphSettingsKeys[group].filter(
				(option) => option !== "colorGroups"
			);
		} else if (group === "filterOptions" && inlineSearchQuery) {
			options = graphSettingsKeys[group].filter(
				(option) => option !== "search"
			);
		} else {
			options = graphSettingsKeys[group];
		}
		for (const option of options) {
			if (preset[option] !== undefined) {
				entries.push([option, preset[option]]);
			}
		}
	}
	lines.push(stringifyYaml(Object.fromEntries(entries)));

	lines.push("```");
	lines.push("");
	lines.push("");

	return lines.join("\n");
};
