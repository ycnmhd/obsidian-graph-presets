import { GraphSettings } from "src/types/graph-settings";
import { parseMarkDownPreset } from "./parse-markdown-preset";
import { describe, test, expect } from "vitest";

type Sample = {
	input: string;
	output: GraphSettings;
};
export const mdToJsonSamples: Sample[] = [
	{
		input: '---\ngraph-presets-plugin: basic\n---\n\npath:: shape\nline:: ("big") | "#e0b152"\npath:: "shapes" | "#99b7b8"\n\n---\n```yaml:graph-preset\ncollapse-filter: false\nshowTags: false\nshowAttachments: true\nhideUnresolved: false\nshowOrphans: true\ncollapse-color-groups: false\ncollapse-display: false\nshowArrow: true\ntextFadeMultiplier: -3\nnodeSizeMultiplier: 5\nlineSizeMultiplier: 5\ncollapse-forces: false\ncenterStrength: 0\nrepelStrength: 0\nlinkStrength: 0\nlinkDistance: 500\nscale: 8\nclose: true\n```\n\n',
		output: {
			"collapse-filter": false,
			search: "path: shape",
			showTags: false,
			showAttachments: true,
			hideUnresolved: false,
			showOrphans: true,
			"collapse-color-groups": false,
			colorGroups: [
				{
					query: 'line: ("big")',
					color: {
						a: 1,
						rgb: 14725458,
					},
				},
				{
					query: 'path: "shapes"',
					color: {
						a: 1,
						rgb: 10074040,
					},
				},
			],
			"collapse-display": false,
			showArrow: true,
			textFadeMultiplier: -3,
			nodeSizeMultiplier: 5,
			lineSizeMultiplier: 5,
			"collapse-forces": false,
			centerStrength: 0,
			repelStrength: 0,
			linkStrength: 0,
			linkDistance: 500,
			scale: 8,
			close: true,
		},
	},
];

describe("parse-markdown-preset", () => {
	test("parse", () => {
		for (const sample of mdToJsonSamples) {
			const output = parseMarkDownPreset(sample.input);
			expect(output).toEqual(sample.output);
		}
	});
});
