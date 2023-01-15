import { yaml } from "src/helpers/yaml";
import { rgbToHex } from "src/views/preset/components/preset-content/components/preset/helpers/map-colors";
import { PRESET_FRONTMATTER } from "src/helpers/constants";
import { graphSettingsKeys } from "src/helpers/obsidian/graph/helpers/graph-settings-keys";
import { GraphSettings } from "src/types/graph-settings";
import { parseSearchQuery } from "./parse-search-query";
import { PluginSettings } from "src/types/settings/settings";

export const mapPresetToMarkdown = (
	preset: GraphSettings,
	markdownPresets: PluginSettings["preferences"]["markdownPresets"] = {
		inlineColorGroups: false,
		inlineSearchQuery: false,
	}
): string => {
	const inlineColorGroups = markdownPresets.inlineColorGroups;
	const inlineSearchQuery = markdownPresets.inlineSearchQuery;
	const lines = [];
	lines.push(PRESET_FRONTMATTER);

	let invalidSearchQuery = false,
		invalidColorGroup = false;
	if (inlineSearchQuery) {
		const searchTuples = parseSearchQuery(preset.search);
		if (searchTuples) {
			for (const [key, value] of searchTuples) {
				lines.push(`${key}:: ${value}`);
			}
		} else {
			invalidSearchQuery = true;
		}
	}

	if (inlineColorGroups) {
		const colorGroups = preset.colorGroups;
		for (const colorGroup of colorGroups) {
			const searchTuples = parseSearchQuery(colorGroup.query);
			if (!searchTuples) {
				invalidColorGroup = true;
				break;
			}
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
		if (
			group === "colorGroupOptions" &&
			inlineColorGroups &&
			!invalidColorGroup
		) {
			options = graphSettingsKeys[group].filter(
				(option) => option !== "colorGroups"
			);
		} else if (
			group === "filterOptions" &&
			inlineSearchQuery &&
			!invalidSearchQuery
		) {
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
	lines.push(yaml.stringify(Object.fromEntries(entries)).replace(/\n$/, ""));

	lines.push("```");
	lines.push("");
	lines.push("");

	return lines.join("\n");
};
