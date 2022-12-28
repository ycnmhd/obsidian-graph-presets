import { Menu, TAbstractFile } from "obsidian";
import { GraphPresetsItemViewIcon } from "../components/presets-view/graph-presets-item-view";
import { savePresetToMarkdown } from "./save-preset-to-markdown/save-preset-to-markdown";

export const savePresetToMarkdownPatch = async (
	menu: Menu,
	file: TAbstractFile
) => {
	menu.addItem((item) => {
		item.setTitle("New Graph Preset")
			.setIcon(GraphPresetsItemViewIcon.name)
			.setSection("pane")
			.onClick(async () => {
				await savePresetToMarkdown({
					file,
				});
			});
	});
	//@ts-ignore
	menu.items.unshift(menu.items.pop());
};
