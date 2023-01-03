import { Menu, TFile } from "obsidian";
import { MouseEventHandler } from "react";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { t } from "src/graph-presets/lang/text";
import { obsidian } from "src/obsidian/obsidian";

export const presetContextMenu =
	(
		meta: MarkdownPresetMeta,
		toggleRenamePreset: () => void
	): MouseEventHandler<HTMLDivElement> =>
	(event) => {
		const file = app.vault.getAbstractFileByPath(meta.path) as TFile;
		const menu = new Menu();
		menu.addItem((item) => {
			item.setTitle(t.c.RENAME);
			item.setIcon("pencil");
			item.onClick(() => {
				toggleRenamePreset();
			}).setSection("action");
		});
		menu.addItem((item) => {
			item.setTitle(t.c.MAKE_A_COPY)
				.setIcon("copy")
				.onClick(async () => {
					const name = obsidian.fs.uniqueFileName({
						filename: file.basename,
						folderPath: file.parent.path,
					});
				
					app.vault.copy(file, name);
				})
				.setSection("action");
		});
		menu.addItem((item) => {
			item.setTitle(t.c.DELETE);
			item.setIcon("trash");
			item.onClick(() => {
				if (file) obsidian.fs.deleteFile(file);
			}).setSection("danger");
		});
		app.workspace.trigger(
			"file-menu",
			menu,
			file,
			"graph-presets-context-menu"
		);
		menu.showAtPosition({
			x: event.clientX,
			y: event.clientY,
		});
	};
