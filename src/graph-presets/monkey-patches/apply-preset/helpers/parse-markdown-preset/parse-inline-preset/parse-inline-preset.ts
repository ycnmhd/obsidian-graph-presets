import { hexToRgb } from "src/graph-presets/components/presets-view/components/presets-list/components/preset/components/preset-preview/groups/helpers/map-colors";
import { ColorGroup, GraphSettings } from "src/types/graph-settings";

const trimString = (str: string) =>
	str.trim(); /* .replace(/^"|"$/g, "").trim() */

const queries = (["path", "file", "tag", "line", "section"] as const)
	.map((q) => [q, `-${q}`] as const)
	.flat();
type Query = typeof queries[number];
const queriesSet = new Set(queries);
export const parseInlinePreset = (file: string) => {
	const settings: Partial<GraphSettings> = {
		search: "",
		colorGroups: [],
	};
	const lines = file.split("\n");
	const queryLines = lines.filter((line) => {
		const key = line.split("::")[0];
		return queriesSet.has(key as Query);
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
		const [key, value] = query.split("::");
		searchQuery.push(`${key}: ${trimString(value)}`);
	}
	settings.search = searchQuery.join(" ");

	const colorGroups: ColorGroup[] = [];
	for (const query of colorQueries) {
		const [key, value] = query.split("::");
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
