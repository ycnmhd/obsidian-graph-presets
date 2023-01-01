import { Menu, TAbstractFile } from "obsidian";
import { GraphPresetsItemViewIcon } from "../components/presets-view/graph-presets-item-view";
import { actions } from "../actions/actions";

export const createMarkdownPresetPatch = async (
	menu: Menu,
	file: TAbstractFile
) => {
	menu.addItem((item) => {
		item.setTitle("New Graph Preset")
			.setIcon(GraphPresetsItemViewIcon.name)
			.setSection("pane")
			.onClick(async () => {
				await actions.createPreset();
			});
	});
	//@ts-ignore
	menu.items.unshift(menu.items.pop());
};
