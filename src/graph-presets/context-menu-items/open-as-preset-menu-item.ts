import { MarkdownView, Menu, WorkspaceLeaf } from "obsidian";
import { GraphPresetsItemViewIcon } from "src/graph-presets/views/presets/presets-view";
import { Router } from "../views/preset/helpers/router";
import { t } from "../lang/text";
import { PresetViewType } from "../views/preset/preset-view";

export const OpenAsPresetMenuItem = async (menu: Menu, leaf: WorkspaceLeaf) => {
	menu.addItem((item) => {
		item.setTitle(t.c.OPEN_AS_PRESET)
			.setIcon(GraphPresetsItemViewIcon.name)
			.setSection("pane")
			.onClick(async () => {
				Router.getInstance().setFileType({
					path: (leaf.view as MarkdownView).file.path,
					type: PresetViewType,
					leaf,
				});
			});
	});
	//@ts-ignore
	menu.items.unshift(menu.items.pop());
};
