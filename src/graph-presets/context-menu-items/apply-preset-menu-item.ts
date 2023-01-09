import { Menu, TFile } from "obsidian";
import { ac } from "src/graph-presets/store/store";
import { t } from "src/graph-presets/lang/text";
import { GraphPresetsItemViewIcon } from "../views/presets/presets-view";

export const ApplyPresetMenuItem = (menu: Menu, file: TFile) => {
	menu.addItem((item) => {
		item.setTitle(t.c.APPLY_PRESET)
			.setIcon(GraphPresetsItemViewIcon.name)
			.setSection("action")
			.onClick(async () => {
				await ac.applyPreset({ created: file.stat.ctime });
			});
	});
	//@ts-ignore
	menu.items.unshift(menu.items.pop());
};
