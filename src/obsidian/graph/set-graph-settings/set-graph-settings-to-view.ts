import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";
import { GraphDataEngine } from "src/types/graph-data-engine";
import { GraphSettings } from "src/types/graph-settings";
import { WorkspaceLeaf } from "obsidian";
import { pickGroup } from "src/graph-presets/actions/helpers/pick-group";
import { engineGroupMap } from "src/graph-presets/helpers/graph-settings-keys";

type Props = {
	leaf: WorkspaceLeaf;
	settings: Partial<GraphSettings>;
	group?: graphSettingsGroup;
};

export const setGraphSettingsToView = async ({
	leaf,
	settings,
	group,
}: Props) => {
	let engine: GraphDataEngine;
	if (leaf.view.getViewType() === "graph") {
		engine = (leaf.view as any).dataEngine as GraphDataEngine;
	} else if (leaf.view.getViewType() === "localgraph") {
		engine = (leaf.view as any).engine as GraphDataEngine;
	} else {
		throw new Error("leaf is not a graph or localgraph");
	}

	if (!group) {
		engine.setOptions(settings as GraphSettings);
		if ("scale" in settings) {
			const renderer = (leaf.view as any).renderer;
			renderer.zoomTo(settings.scale);
		}
		if ("close" in settings) {
			const controlsEl = (leaf.view as any).controlsEl;
			controlsEl.toggleClass("is-close", settings.close);
		}
	} else {
		const settingsGroup = pickGroup(group, settings as GraphSettings);
		const engineGroup = engine[engineGroupMap[group]];
		engineGroup.setOptions(settingsGroup);
	}
	engine.render();
};
