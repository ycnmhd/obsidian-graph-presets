import { Menu, TFile } from "obsidian";
import { t } from "../lang/text";
import { ac } from "../store/store";

export const MakeACopyMenuItem = (menu: Menu, file: TFile) => {
	menu.addItem((item) => {
		item.setTitle(t.c.MAKE_A_COPY)
			.setIcon("copy")
			.onClick(async () => {
				ac.duplicatePreset({ created: file.stat.ctime });
			})
			.setSection("action");
	});
};
