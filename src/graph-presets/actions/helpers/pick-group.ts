import { GraphSettings, FilterOptions, ColorGroupOptions, ForceOptions, DisplayOptions } from "src/types/graph-settings";
import { graphSettingsGroup } from "../apply-preset";

export const pickGroup = (
	group: graphSettingsGroup,
	settings: GraphSettings
): FilterOptions | ColorGroupOptions | ForceOptions | DisplayOptions => {
	if (group === "filters") {
		const group: FilterOptions = {
			hideUnresolved: settings.hideUnresolved,
			search: settings.search,
			showAttachments: settings.showAttachments,
			showOrphans: settings.showOrphans,
			"collapse-filter": settings["collapse-filter"],
			showTags: settings.showTags,
		};
		return group;
	} else if (group === "groups") {
		const group: ColorGroupOptions = {
			colorGroups: settings.colorGroups,
			"collapse-color-groups": settings["collapse-color-groups"],
		};
		return group;
	} else if (group === "display") {
		const group: DisplayOptions = {
			lineSizeMultiplier: settings.lineSizeMultiplier,
			nodeSizeMultiplier: settings.nodeSizeMultiplier,
			showArrow: settings.showArrow,
			textFadeMultiplier: settings.textFadeMultiplier,
			"collapse-display": settings["collapse-display"],
		};
		return group;
	} else if (group === "forces") {
		const group: ForceOptions = {
			centerStrength: settings.centerStrength,
			linkDistance: settings.linkDistance,
			linkStrength: settings.linkStrength,
			repelStrength: settings.repelStrength,
			"collapse-forces": settings["collapse-forces"],
		};
		return group;
	}
	throw new Error(`Group "${group}" is not supported`);
};
