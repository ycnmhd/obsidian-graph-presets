import { Menu, TAbstractFile } from "obsidian";
import { GraphPresetsItemViewIcon } from "src/graph-presets/components/presets-view/graph-presets-item-view";
import { savePresetToMarkdown } from "../create-markdown-preset/save-preset-to-markdown";

export const updateMarkdownPresetPatch = async (
	menu: Menu,
	file: TAbstractFile
) => {
	menu.addItem((item) => {
		item.setTitle("Update Graph Preset")
			.setIcon(GraphPresetsItemViewIcon.name)
			.setSection("pane")
			.onClick(async () => {
				await savePresetToMarkdown({
					file,
					mode: "update",
				});
			});
	});
	//@ts-ignore
	menu.items.unshift(menu.items.pop());
};
