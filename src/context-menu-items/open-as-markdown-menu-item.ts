import { Menu, WorkspaceLeaf } from "obsidian";
import { t } from "../lang/text";
import { Router } from "../views/preset/helpers/router";
import { PresetView } from "../views/preset/preset-view";

export const OpenAsMarkdownMenuItem = (menu: Menu, leaf: WorkspaceLeaf) => {
	menu.addItem((item) => {
		item.setTitle(t.c.OPEN_AS_MARKDOWN)
			.setIcon("document")
			.onClick(async () => {
				await Router.getInstance().setFileType({
					path: (leaf.view as PresetView).file.path,
					type: "markdown",
					leaf: leaf,
				});
			});
	}).addSeparator();
};
