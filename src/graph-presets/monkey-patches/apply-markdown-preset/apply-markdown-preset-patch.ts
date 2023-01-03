import { Menu, TFile } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";
import { t } from "src/graph-presets/lang/text";
import { GraphPresetsItemViewIcon } from "../../components/presets-view/graph-presets-item-view";

export const applyMarkdownPresetPatch = (menu: Menu, file: TFile) => {
	menu.addItem((item) => {
		item.setTitle(t.c.APPLY_PRESET)
			.setIcon(GraphPresetsItemViewIcon.name)
			.setSection("action")
			.onClick(async () => {
				await actions.applyPreset({ created: file.stat.ctime });
			});
	});
	//@ts-ignore
	menu.items.unshift(menu.items.pop());
};
