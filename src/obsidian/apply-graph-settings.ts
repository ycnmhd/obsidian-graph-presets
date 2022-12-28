import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";
import { GraphDataEngine } from "src/types/graph-data-engine";
import { GraphSettings } from "src/types/graph-settings";
import { graphSettingsKeys } from "src/graph-presets/helpers/graph-settings-keys";
import { obsidian } from "./obsidian";

export const applyGraphSettings = async (
	settings: Partial<GraphSettings>,
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
		for (const option of graphSettingsKeys.filterOptions) {
			if (option in settings)
				filterOptionListeners[option](settings[option]);
		}
	}

	if (!group || group === "groups") {
		const colorGroupOptionListeners =
			engine.colorGroupOptions.optionListeners;
		for (const option of graphSettingsKeys.colorGroupOptions) {
			if (option in settings)
				colorGroupOptionListeners[option](settings[option]);
		}
	}

	if (!group || group === "display") {
		const displayOptionListeners = engine.displayOptions.optionListeners;
		for (const option of graphSettingsKeys.displayOptions) {
			if (option in settings)
				displayOptionListeners[option](settings[option]);
		}
	}

	if (!group || group === "forces") {
		const forceOptionListeners = engine.forceOptions.optionListeners;
		for (const option of graphSettingsKeys.forceOptions) {
			if (option in settings)
				forceOptionListeners[option](settings[option]);
		}
	}
};
