import { Menu, WorkspaceLeaf } from "obsidian";
import { GraphPresetsItemViewIcon } from "src/graph-presets/components/presets-view/graph-presets-item-view";
import { Router } from "../views/preset/helpers/router";
import { t } from "../lang/text";
import { PresetViewType } from "../views/preset/preset-view";

export const renderLeafAsPreset = async (menu: Menu, leaf: WorkspaceLeaf) => {
	menu.addItem((item) => {
		item.setTitle(t.c.OPEN_AS_PRESET)
			.setIcon(GraphPresetsItemViewIcon.name)
			.setSection("pane")
			.onClick(async () => {
				Router.getInstance().setLeafType({
					leaf,
					type: PresetViewType,
					setState: true,
				});
			});
	});
	//@ts-ignore
	menu.items.unshift(menu.items.pop());
};
