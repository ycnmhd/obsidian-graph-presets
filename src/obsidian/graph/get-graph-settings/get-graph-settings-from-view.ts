import { WorkspaceLeaf } from "obsidian";
import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";
import { GraphDataEngine } from "src/types/graph-data-engine";
import { graphSettingsKeys } from "src/graph-presets/helpers/graph-settings-keys";
import { GraphSettings } from "src/types/graph-settings";

type Props = { leaf: WorkspaceLeaf; group?: graphSettingsGroup };

export const getGraphSettingsFromView = ({ group, leaf }: Props) => {
	let engine: GraphDataEngine;
	if (leaf.view.getViewType() === "localgraph") {
		engine = (leaf.view as any).engine as GraphDataEngine;
	} else if (leaf.view.getViewType() === "graph") {
		engine = (leaf.view as any).dataEngine as GraphDataEngine;
	} else {
		throw new Error("Invalid view type: " + leaf.view.getViewType());
	}

	const settings: Partial<GraphSettings> = {};
	if (!group || group === "filters") {
		const optionListeners = engine.filterOptions.optionListeners;
		for (const option of graphSettingsKeys.filterOptions) {
			const optionListener = optionListeners[option] as () => any;
			if (optionListener) {
				settings[option] = optionListener();
			}
		}
	}

	if (!group || group === "groups") {
		const optionListeners = engine.colorGroupOptions.optionListeners;
		for (const option of graphSettingsKeys.colorGroupOptions) {
			const optionListener = optionListeners[option] as () => any;
			if (optionListener) {
				settings[option] = optionListener();
			}
		}
	}

	if (!group || group === "display") {
		const optionListeners = engine.displayOptions.optionListeners;
		for (const option of graphSettingsKeys.displayOptions) {
			const optionListener = optionListeners[option] as () => any;
			if (optionListener) {
				settings[option] = optionListener();
			}
		}
	}

	if (!group || group === "forces") {
		const optionListeners = engine.forceOptions.optionListeners;
		for (const option of graphSettingsKeys.forceOptions) {
			const optionListener = optionListeners[option] as () => any;
			if (optionListener) {
				settings[option] = optionListener();
			}
		}
	}

	return settings as GraphSettings;
};
