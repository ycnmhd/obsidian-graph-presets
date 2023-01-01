export interface Color {
	a: number;
	rgb: number;
}

export interface ColorGroup {
	query: string;
	color: Color;
}

export interface FilterOptions {
	"collapse-filter": boolean;
	search: string;
	showTags: boolean;
	showAttachments: boolean;
	hideUnresolved: boolean;
	showOrphans: boolean;
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
