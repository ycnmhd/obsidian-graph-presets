import { Menu, WorkspaceLeaf } from "obsidian";
import { GraphPresetsItemViewIcon } from "src/graph-presets/components/presets-view/graph-presets-item-view";
import { GraphPresets } from "../graph-presets";
import { PresetViewType } from "../views/preset/preset-view";

export const renderLeafAsPreset = async (menu: Menu, leaf: WorkspaceLeaf) => {
	menu.addItem((item) => {
		item.setTitle("Render Leaf as Preset")
			.setIcon(GraphPresetsItemViewIcon.name)
			.setSection("pane")
			.onClick(async () => {
				const plugin = GraphPresets.getInstance();
				plugin.viewManager.setLeafType({
					leaf,
					type: PresetViewType,
					setState: true,
				});
			});
	});
	//@ts-ignore
	menu.items.unshift(menu.items.pop());
};