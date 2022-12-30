import { hexToRgb } from "src/graph-presets/components/presets-view/components/presets-list/components/preset/components/preset-preview/groups/helpers/map-colors";
import { ColorGroup, GraphSettings } from "src/types/graph-settings";
import {
	SearchQueryVariant,
	searchQueryVariantsSet,
} from "src/types/search-query";

const trimString = (str: string) =>
	str.trim(); /* .replace(/^"|"$/g, "").trim() */

export const parseInlinePreset = (file: string) => {
	const settings: Partial<GraphSettings> = {
		search: "",
		colorGroups: [],
	};
	const lines = file.split("\n");
	const queryLines = lines.filter((line) => {
		const key = line.split("::")[0];
		return searchQueryVariantsSet.has(key as SearchQueryVariant);
	});

	const { filterQueries, colorQueries } = queryLines.reduce(
		(acc, line) => {
			if (line.includes("|")) {
				acc.colorQueries.push(line);
			} else {
				acc.filterQueries.push(line);
			}
			return acc;
		},
		{
			filterQueries: [] as string[],
			colorQueries: [] as string[],
		}
	);

	const searchQuery: string[] = [];
	for (const query of filterQueries) {
		const [key, value] = query.split(/::(.+)/);
		searchQuery.push(`${key}: ${trimString(value)}`);
	}
	settings.search = searchQuery.join(" ");

	const colorGroups: ColorGroup[] = [];
	for (const query of colorQueries) {
		const [key, value] = query.split(/::(.+)/);
		const [colorQuery, color] = value.split("|");
		colorGroups.push({
			query: `${key}: ${trimString(colorQuery)}`,
			color: {
				rgb: hexToRgb(trimString(color)),
				a: 1,
			},
		});
	}
	settings.colorGroups = colorGroups;

	return settings;
};
