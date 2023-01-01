import { Menu, TAbstractFile, TFolder } from "obsidian";
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
				await actions.createPreset(
					undefined,
					undefined,
					file instanceof TFolder ? file.path : file.parent.path,
					true
				);
			});
	});
	//@ts-ignore
	menu.items.unshift(menu.items.pop());
};
