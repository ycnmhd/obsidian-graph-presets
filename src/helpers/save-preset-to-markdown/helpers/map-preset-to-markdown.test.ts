import { mdToJsonSamples } from "../../parse-markdown-preset/parse-markdown-preset.test";
import { describe, test, expect } from "vitest";
import { mapPresetToMarkdown } from "./map-preset-to-markdown";
import { GraphSettings } from "src/types/graph-settings";

type Sample = {
	input: GraphSettings;
	output: string;
};
const samples: Sample[] = [
	...mdToJsonSamples.map((sample) => ({
		input: sample.output,
		output: sample.input,
	})),
	{
		input: {
			...mdToJsonSamples[0].output,
			search: 'foo: "bar" -path: "foo/bar"',
		} as GraphSettings,
		output: '---\ngraph-presets-plugin: basic\n---\n\nline:: ("big") | "#e0b152"\npath:: "shapes" | "#99b7b8"\n\n---\n```yaml:graph-preset\ncollapse-filter: false\nsearch: \'foo: "bar" -path: "foo/bar"\'\nshowTags: false\nshowAttachments: true\nhideUnresolved: false\nshowOrphans: true\ncollapse-color-groups: false\ncollapse-display: false\nshowArrow: true\ntextFadeMultiplier: -3\nnodeSizeMultiplier: 5\nlineSizeMultiplier: 5\ncollapse-forces: false\ncenterStrength: 0\nrepelStrength: 0\nlinkStrength: 0\nlinkDistance: 500\nscale: 8\nclose: true\n```\n\n',
	},
];

describe("map-preset-to-markdown", () => {
	test("map", () => {
		for (const sample of samples) {
			const output = mapPresetToMarkdown(sample.input, {
				inlineColorGroups: true,
				inlineSearchQuery: true,
			});
			expect(output).toEqual(sample.output);
		}
	});
});
