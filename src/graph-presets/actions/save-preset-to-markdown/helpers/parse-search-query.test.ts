import { describe, test, expect } from "vitest";
import { parseSearchQuery, QueryStringTuple } from "./parse-search-query";

type Sample = {
	input: string;
	output: QueryStringTuple[] | null;
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
	{
		input: 'path: "foo/profiles/paths" line:"bar/paths/lines"',
		output: [
			["path", '"foo/profiles/paths"'],
			["line", '"bar/paths/lines"'],
		],
	},
	{
		input: 'foo: "bar" -path: "foo/bar"',
		output: null,
	},
	{
		input: 'foo',
		output: null,
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
