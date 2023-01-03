import { Menu, TAbstractFile, TFolder } from "obsidian";
import { GraphPresetsItemViewIcon } from "../components/presets-view/graph-presets-item-view";
import { actions } from "../actions/actions";
import { t } from "../lang/text";

export const createMarkdownPresetPatch = async (
	menu: Menu,
	file: TAbstractFile
) => {
	menu.addItem((item) => {
		item.setTitle(t.c.NEW_PRESET)
			.setIcon(GraphPresetsItemViewIcon.name)
			.setSection("action")
			.onClick(async () => {
				await actions.createPreset(
					undefined,
					undefined,
					file instanceof TFolder ? file.path : file.parent.path,
					true
				);
			});
	});
	//@ts-ignore
	menu.items.unshift(menu.items.pop());
};
