import { Menu, TFile } from "obsidian";
import { ac } from "src/store/store";
import { t } from "src/lang/text";
export const ApplyPresetMenuItem = (menu: Menu, file: TFile) => {
	menu.addItem((item) => {
		item.setTitle(t.c.APPLY_PRESET)
			.setIcon("apply-preset")
			.setSection("action")
			.onClick(async () => {
				await ac.applyPreset({ created: file.stat.ctime });
			});
	});
	//@ts-ignore
	menu.items.unshift(menu.items.pop());
};
