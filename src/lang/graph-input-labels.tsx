import { GraphSettings } from "src/types/graph-settings";

export const graphInputLabels: Partial<Record<keyof GraphSettings, string>> = {
	localJumps: "Depth",
	localBacklinks: "Incoming links",
	localForelinks: "Outgoing links",
	localInterlinks: "Neighbor links",
	showTags: "Tags",
	showAttachments: "Attachments",
	hideUnresolved: "Existing files only",
	showOrphans: "Orphans",

	showArrow: "Arrows",
	textFadeMultiplier: "Text fade threshold",
	nodeSizeMultiplier: "Node size",
	lineSizeMultiplier: "Link thickness",

	centerStrength: "Center force",
	repelStrength: "Repel force",
	linkStrength: "Link force",
	linkDistance: "Link distance",
};
