import { Menu, TAbstractFile, TFile } from "obsidian";
import { GraphPresetsItemViewIcon } from "src/graph-presets/components/presets-view/graph-presets-item-view";
import { actions } from "../actions/actions";
import { t } from "../lang/text";

export const updateMarkdownPresetPatch = async (
	menu: Menu,
	file: TAbstractFile
) => {
	menu.addItem((item) => {
		item.setTitle(t.c.UPDATE_PRESET)
		.setIcon(GraphPresetsItemViewIcon.name)
		.setSection("action")
			.onClick(async () => {
				if (file instanceof TFile)
					await actions.updatePreset({
						created: file.stat.ctime,
					});
			})
	});
	//@ts-ignore
	menu.items.unshift(menu.items.pop());
};
