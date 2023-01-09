import { Menu, TFile } from "obsidian";
import { obsidian } from "src/helpers/obsidian/obsidian";
import { t } from "../lang/text";

export const DeletePresetMenuItem = (menu: Menu, file: TFile) => {
	menu.addItem((item) => {
		item.setTitle(t.c.DELETE);
		item.setIcon("trash");
		item.onClick(() => {
			if (file) obsidian.fs.deleteFile(file);
		}).setSection("danger");
	});
};
