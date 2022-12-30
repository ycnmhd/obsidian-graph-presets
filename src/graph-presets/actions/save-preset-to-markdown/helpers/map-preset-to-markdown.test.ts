import { mdToJsonSamples } from "../../../monkey-patches/apply-markdown-preset/helpers/parse-markdown-preset/parse-markdown-preset.test";
import { describe, test, expect } from "vitest";
import { mapPresetToMarkdown } from "./map-preset-to-markdown";
const samples = mdToJsonSamples.map((sample) => ({
	input: sample.output,
	output: sample.input,
}));

describe("map-preset-to-markdown", () => {
	test("map", () => {
		for (const sample of samples) {
			const output = mapPresetToMarkdown(sample.input);
			expect(output).toEqual(sample.output);
		}
	});
});
