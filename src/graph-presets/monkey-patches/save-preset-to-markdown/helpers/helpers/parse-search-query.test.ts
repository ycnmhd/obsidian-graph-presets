import { describe, test, expect } from "vitest";
import { parseSearchQuery, QueryStringTuple } from "./parse-search-query";

type Sample = {
	input: string;
	output: QueryStringTuple[];
};
const samples: Sample[] = [
	{
		input: 'path: "💻/obsidian/graph-presets" -path:"issues/archived" -path: documents -line:"database-plugin: basic"',
		output: [
			["path", '"💻/obsidian/graph-presets"'],
			["-path", '"issues/archived"'],
			["-path", "documents"],
			["-line", '"database-plugin: basic"'],
		],
	},
];

describe("parse-search-query", () => {
	test("parse", () => {
		for (const sample of samples) {
			const output = parseSearchQuery(sample.input);
			expect(output).toEqual(sample.output);
		}
	});
});
