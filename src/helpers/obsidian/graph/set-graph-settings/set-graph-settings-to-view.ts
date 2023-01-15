import { graphSettingsGroup } from "src/types/apply-preset";
import { GraphDataEngine } from "src/types/graph-data-engine";
import { GraphSettings } from "src/types/graph-settings";
import { WorkspaceLeaf } from "obsidian";
import { pickGroup } from "src/helpers/obsidian/graph/helpers/pick-group";
import { engineGroupMap } from "src/helpers/obsidian/graph/helpers/graph-settings-keys";
import { getSnapshot } from "src/store/store";

type Props = {
	leaf: WorkspaceLeaf;
	settings: Partial<GraphSettings>;
	group?: graphSettingsGroup;
};

const collapseKeys: Readonly<(keyof GraphSettings)[]> = [
	"collapse-filter",
	"collapse-color-groups",
	"collapse-display",
	"collapse-forces",
] as const;

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

	const { scale, ...rest } = { ...settings } as GraphSettings;

	const collapsed: Partial<GraphSettings> = {};
	collapseKeys.forEach((key) => {
		if (key in rest) {
			// @ts-ignore
			collapsed[key] = rest[key];
			// @ts-ignore
			delete rest[key];
		}
	});
	if (!group) {
		engine.setOptions(rest as GraphSettings);
		const store = getSnapshot();
		if (store.preferences.restoreCollapsedState) {
			engine.setOptions(collapsed as any);
		}
		if (scale) {
			if (store.preferences.restoreZoom) {
				const renderer = (leaf.view as any).renderer;
				renderer.zoomTo(scale);
			}
		}
		/*if ("close" in settings) {
			const controlsEl = (leaf.view as any).controlsEl;
			if (controlsEl) controlsEl.toggleClass("is-close", settings.close);
		}*/
	} else {
		const settingsGroup = pickGroup(group, rest as GraphSettings);
		const engineGroup = engine[engineGroupMap[group]];
		engineGroup.setOptions(settingsGroup);
	}
	engine.render();
};
