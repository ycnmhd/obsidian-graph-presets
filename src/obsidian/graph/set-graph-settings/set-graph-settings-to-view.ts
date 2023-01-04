import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";
import { GraphDataEngine } from "src/types/graph-data-engine";
import { GraphSettings } from "src/types/graph-settings";
import { graphSettingsKeys } from "src/graph-presets/helpers/graph-settings-keys";
import { WorkspaceLeaf } from "obsidian";

export const setGraphSettingsToView = async (
	leaf: WorkspaceLeaf,
	settings: Partial<GraphSettings>,
	group?: graphSettingsGroup
) => {
	let engine: GraphDataEngine;
	if (leaf.view.getViewType() === "graph") {
		engine = (leaf.view as any).dataEngine as GraphDataEngine;
	} else if (leaf.view.getViewType() === "localgraph") {
		engine = (leaf.view as any).engine as GraphDataEngine;
	} else {
		throw new Error("leaf is not a graph or localgraph");
	}

	if (!group || group === "filters") {
		const optionListeners = engine.filterOptions.optionListeners;
		for (const option of graphSettingsKeys.filterOptions) {
			const optionListener = optionListeners[option] as (
				value: any
			) => void;
			if (option in settings && typeof optionListener === "function") {
				optionListener(settings[option]);
			}
		}
	}

	if (!group || group === "groups") {
		const optionListeners = engine.colorGroupOptions.optionListeners;
		for (const option of graphSettingsKeys.colorGroupOptions) {
			const optionListener = optionListeners[option] as (
				value: any
			) => void;
			if (option in settings && typeof optionListener === "function") {
				optionListener(settings[option]);
			}
		}
	}

	if (!group || group === "display") {
		const optionListeners = engine.displayOptions.optionListeners;
		for (const option of graphSettingsKeys.displayOptions) {
			const optionListener = optionListeners[option];
			if (option in settings && typeof optionListener === "function") {
				optionListener(settings[option] as any);
			}
		}
	}

	if (!group || group === "forces") {
		const optionListeners = engine.forceOptions.optionListeners;
		for (const option of graphSettingsKeys.forceOptions) {
			const optionListener = optionListeners[option];
			if (option in settings && typeof optionListener === "function") {
				optionListener(settings[option] as any);
			}
		}
	}
};
