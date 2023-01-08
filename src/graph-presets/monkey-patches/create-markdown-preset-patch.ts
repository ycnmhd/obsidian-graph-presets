import { Menu, TAbstractFile, TFolder } from "obsidian";
import { GraphPresetsItemViewIcon } from "../views/presets/presets-view";
import { ac } from "../store/store";
import { t } from "../lang/text";

export const createMarkdownPresetPatch = async (
	menu: Menu,
	file: TAbstractFile
) => {
	menu.addItem((item) => {
		item.setTitle(t.c.NEW_PRESET)
			.setIcon(GraphPresetsItemViewIcon.name)
			.onClick(async () => {
				await ac.createPreset({
					presetName: "",
					folderPath:
						file instanceof TFolder ? file.path : file.parent.path,
				});
			});
	});
};
