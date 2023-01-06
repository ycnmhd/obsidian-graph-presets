import { GraphDataEngine } from "src/types/graph-data-engine";
import {
	FilterOptions,
	DisplayOptions,
	ForceOptions,
	ColorGroupOptions,
	RootGraphOptions,
} from "src/types/graph-settings";
import { graphSettingsGroup } from "../actions/apply-preset";

const filterOptionsRecord: Record<keyof FilterOptions, boolean> = {
	"collapse-filter": false,
	search: false,
	showTags: false,
	showAttachments: false,
	hideUnresolved: false,
	showOrphans: false,
	localBacklinks: false,
	localForelinks: false,
	localInterlinks: false,
	localJumps: false,
} as const;
const filterOptions = Object.keys(
	filterOptionsRecord
) as (keyof FilterOptions)[];

const displayOptionsRecord: Record<keyof DisplayOptions, boolean> = {
	"collapse-display": false,
	showArrow: false,
	textFadeMultiplier: false,
	nodeSizeMultiplier: false,
	lineSizeMultiplier: false,
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

export const engineGroupMap = {
	filters: "filterOptions",
	groups: "colorGroupOptions",
	display: "displayOptions",
	forces: "forceOptions",
} satisfies Record<graphSettingsGroup, keyof GraphDataEngine>;
