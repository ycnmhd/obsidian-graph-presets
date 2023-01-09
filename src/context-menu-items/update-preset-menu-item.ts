import { Menu, TAbstractFile, TFile } from "obsidian";
import { ac } from "../store/store";
import { t } from "../lang/text";

export const UpdatePresetMenuItem = async (menu: Menu, file: TAbstractFile) => {
	menu.addItem((item) => {
		item.setTitle(t.c.UPDATE_PRESET)
			.setIcon("update-preset")
			.setSection("action")
			.onClick(async () => {
				if (file instanceof TFile)
					await ac.updatePreset({
						created: file.stat.ctime,
					});
			});
	});
	//@ts-ignore
	menu.items.unshift(menu.items.pop());
};
