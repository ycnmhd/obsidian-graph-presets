import { Notice } from "obsidian";
import { obsidian } from "src/obsidian/obsidian";
import {
	ColorGroupOptions,
	DisplayOptions,
	FilterOptions,
	ForceOptions,
	GraphSettings,
} from "src/types/graph-settings";
import { GraphPresets } from "../graph-presets";
import { graphSettingsGroup } from "./apply-preset";

export const pickGroup = (
	group: graphSettingsGroup,
	settings: GraphSettings
): FilterOptions | ColorGroupOptions | ForceOptions | DisplayOptions => {
	if (group === "filter") {
		const group: FilterOptions = {
			hideUnresolved: settings.hideUnresolved,
			search: settings.search,
			showAttachments: settings.showAttachments,
			showOrphans: settings.showOrphans,
			"collapse-filter": settings["collapse-filter"],
			showTags: settings.showTags,
		};
		return group;
	} else if (group === "color-groups") {
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
			scale: settings.scale,
			"collapse-forces": settings["collapse-forces"],
		};
		return group;
	}
	throw new Error(`Group "${group}" is not supported`);
};

export const updatePreset = async (
	presetName: string,
	group?: graphSettingsGroup
) => {
	const plugin = GraphPresets.getInstance();
	const settings = await obsidian.getGraphSettings();
	const preset = plugin.settings.presets[presetName];
	if (!preset) throw new Error(`Preset "${presetName}" does not exist`);
	if (!group) preset.settings = settings;
	else {
		preset.settings = {
			...preset.settings,
			...pickGroup(group, settings),
		};
	}
	preset.meta.updated = Date.now();
	await plugin.saveSettings();
	new Notice(`Preset "${presetName}" updated`);
};
