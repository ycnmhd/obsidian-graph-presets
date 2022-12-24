import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";
import { GraphDataEngine } from "src/types/graph-data-engine";
import { GraphSettings } from "src/types/graph-settings";
import { obsidian } from "./obsidian";

export const applyGraphSettings = async (
	settings: GraphSettings,
	group?: graphSettingsGroup
) => {
	let view = app.workspace.getLeavesOfType("graph")[0];
	if (!view) {
		await obsidian.openGraphView();
		view = app.workspace.getLeavesOfType("graph")[0];
	} else {
		app.workspace.revealLeaf(view);
	}

	const engine = (view as any).view.dataEngine as GraphDataEngine;

	if (!group || group === "filters") {
		const filterOptionListeners = engine.filterOptions.optionListeners;
		filterOptionListeners.hideUnresolved(settings.hideUnresolved);
		filterOptionListeners.search(settings.search);
		filterOptionListeners.showAttachments(settings.showAttachments);
		filterOptionListeners.showOrphans(settings.showOrphans);
	}

	if (!group || group === "groups") {
		const colorGroupOptionListeners =
			engine.colorGroupOptions.optionListeners;
		colorGroupOptionListeners.colorGroups(settings.colorGroups);
	}

	if (!group || group === "display") {
		const displayOptionListeners = engine.displayOptions.optionListeners;
		displayOptionListeners.lineSizeMultiplier(settings.lineSizeMultiplier);
		displayOptionListeners.nodeSizeMultiplier(settings.nodeSizeMultiplier);
		displayOptionListeners.showArrow(settings.showArrow);
		displayOptionListeners.textFadeMultiplier(settings.textFadeMultiplier);
	}

	if (!group || group === "forces") {
		const forceOptionListeners = engine.forceOptions.optionListeners;
		forceOptionListeners.centerStrength(settings.centerStrength);
		forceOptionListeners.repelStrength(settings.repelStrength);
		forceOptionListeners.linkStrength(settings.linkStrength);
		forceOptionListeners.linkDistance(settings.linkDistance);
	}
};
