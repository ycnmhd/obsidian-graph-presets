import { WorkspaceLeaf } from "obsidian";
import { graphSettingsGroup } from "src/types/apply-preset";
import { GraphDataEngine } from "src/types/graph-data-engine";
import { pickGroup } from "src/graph-presets/actions/helpers/pick-group";

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

	const options = engine.getOptions();

	if (group) {
		return {
			...pickGroup(group, options),
			scale: options.scale,
			close: options.close,
		};
	} else return options;
};
