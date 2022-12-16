export interface Color {
	a: number;
	rgb: number;
}

export interface ColorGroup {
	query: string;
	color: Color;
}

export interface GraphSettings {
	"collapse-filter": boolean;
	search: string;
	showTags: boolean;
	showAttachments: boolean;
	hideUnresolved: boolean;
	showOrphans: boolean;
	"collapse-color-groups": boolean;
	colorGroups: ColorGroup[];
	"collapse-display": boolean;
	showArrow: boolean;
	textFadeMultiplier: number;
	nodeSizeMultiplier: number;
	lineSizeMultiplier: number;
	"collapse-forces": boolean;
	centerStrength: number;
	repelStrength: number;
	linkStrength: number;
	linkDistance: number;
	scale: number;
	close: boolean;
}
