import {
	FilterOptions,
	DisplayOptions,
	ForceOptions,
	ColorGroupOptions,
	RootGraphOptions,
} from "src/types/graph-settings";

const filterOptionsRecord: Record<keyof FilterOptions, boolean> = {
	hideUnresolved: false,
	search: false,
	showAttachments: false,
	showOrphans: false,
	"collapse-filter": false,
	showTags: false,
} as const;
const filterOptions = Object.keys(
	filterOptionsRecord
) as (keyof FilterOptions)[];

const displayOptionsRecord: Record<keyof DisplayOptions, boolean> = {
	"collapse-display": false,
	lineSizeMultiplier: false,
	nodeSizeMultiplier: false,
	showArrow: false,
	textFadeMultiplier: false,
} as const;
const displayOptions = Object.keys(
	displayOptionsRecord
) as (keyof DisplayOptions)[];

const forceOptionsRecord: Record<keyof ForceOptions, boolean> = {
	"collapse-forces": false,
	centerStrength: false,
	repelStrength: false,
	linkStrength: false,
	linkDistance: false,
} as const;
const forceOptions = Object.keys(forceOptionsRecord) as (keyof ForceOptions)[];

const colorGroupOptionsRecord: Record<keyof ColorGroupOptions, boolean> = {
	"collapse-color-groups": false,
	colorGroups: false,
} as const;
const colorGroupOptions = Object.keys(
	colorGroupOptionsRecord
) as (keyof ColorGroupOptions)[];

const rootOptionsRecord: Record<keyof RootGraphOptions, boolean> = {
	scale: false,
	close: false,
} as const;

const rootOptions = Object.keys(
	rootOptionsRecord
) as (keyof RootGraphOptions)[];

export const graphSettingsKeys = {
	filterOptions,
	colorGroupOptions,
	displayOptions,
	forceOptions,
	rootOptions,
};
