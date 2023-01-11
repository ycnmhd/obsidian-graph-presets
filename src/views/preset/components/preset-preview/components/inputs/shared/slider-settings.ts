import { GraphSettings } from "src/types/graph-settings";

export type SliderSettings = {
	min: number;
	max: number;
	step: number | "any";
};
export const sliderSettings = {
	localJumps: {
		min: 1,
		max: 5,
		step: 1,
	},
	textFadeMultiplier: {
		step: 0.1,
		min: -3,
		max: 3,
	},
	nodeSizeMultiplier: {
		step: "any",
		min: 0.1,
		max: 5,
	},
	lineSizeMultiplier: {
		step: "any",
		min: 0.1,
		max: 5,
	},
	centerStrength: {
		step: 0.1, // "any",
		min: 0,
		max: 1,
	},
	repelStrength: {
		step: 0.1, // "any",
		min: 0,
		max: 20,
	},
	linkStrength: {
		step: 0.1, // "any",
		min: 0,
		max: 1,
	},
	linkDistance: {
		step: 1,
		min: 30,
		max: 500,
	},
} satisfies Readonly<{
	[key in keyof GraphSettings]?: SliderSettings;
}>;
