import { Menu, TFile } from "obsidian";
import { parseAndApplyMarkdownPreset } from "src/graph-presets/monkey-patches/apply-markdown-preset/helpers/parse-and-apply-markdown-preset";
import { GraphPresetsItemViewIcon } from "../../components/presets-view/graph-presets-item-view";

export const applyMarkdownPresetPatch = (menu: Menu, file: TFile) => {
	menu.addItem((item) => {
		item.setTitle("Apply Graph Preset")
			.setIcon(GraphPresetsItemViewIcon.name)
			.setSection("pane")
			.onClick(async () => {
				await parseAndApplyMarkdownPreset({
					file,
				});
			});
	});
	//@ts-ignore
	menu.items.unshift(menu.items.pop());
};
