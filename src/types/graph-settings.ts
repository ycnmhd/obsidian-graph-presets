export interface Color {
	a: number;
	rgb: number;
}

export interface ColorGroup {
	query: string;
	color: Color;
}

 interface GlobalFilterOptions {
	showOrphans: boolean;
}

 interface LocalFilterOptions {
	localBacklinks: boolean;
	localForelinks: boolean;
	localInterlinks: boolean;
	localJumps: number;
}

export interface FilterOptions
	extends Partial<GlobalFilterOptions>,
		Partial<LocalFilterOptions> {
	"collapse-filter": boolean;
	search: string;
	showTags: boolean;
	showAttachments: boolean;
	hideUnresolved: boolean;
}

export interface ColorGroupOptions {
	"collapse-color-groups": boolean;
	colorGroups: ColorGroup[];
}

export interface DisplayOptions {
	"collapse-display": boolean;
	showArrow: boolean;
	textFadeMultiplier: number;
	nodeSizeMultiplier: number;
	lineSizeMultiplier: number;
}

export interface ForceOptions {
	"collapse-forces": boolean;
	centerStrength: number;
	repelStrength: number;
	linkStrength: number;
	linkDistance: number;
}

export interface RootGraphOptions {
	scale: number;
	close: boolean;
}

export interface GraphSettings
	extends FilterOptions,
		ColorGroupOptions,
		DisplayOptions,
		ForceOptions,
		RootGraphOptions {}
