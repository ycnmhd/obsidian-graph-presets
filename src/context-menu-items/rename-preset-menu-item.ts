import { Menu } from "obsidian";
import { t } from "../lang/text";

export const RenamePresetMenuItem = async (
	menu: Menu,
	toggleRenamePreset: () => void
) => {
	menu.addItem((item) => {
		item.setTitle(t.c.RENAME);
		item.setIcon("pencil");
		item.onClick(() => {
			toggleRenamePreset();
		}).setSection("action");
	});
};
