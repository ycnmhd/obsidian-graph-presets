import { Menu } from "obsidian";
import { MouseEventHandler } from "react";
import { DeletePresetMenuItem } from "src/graph-presets/context-menu-items/delete-preset-menu-item";
import { MakeACopyMenuItem } from "src/graph-presets/context-menu-items/make-a-copy-menu-item";
import { RenamePresetMenuItem } from "src/graph-presets/context-menu-items/rename-preset-menu-item";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { filesByCtime } from "src/graph-presets/store/cache/files-by-time";

export const presetContextMenu =
	(
		meta: MarkdownPresetMeta,
		toggleRenamePreset: () => void
	): MouseEventHandler<HTMLDivElement> =>
	(event) => {
		const file = filesByCtime.current[meta.created];
		const menu = new Menu();
		RenamePresetMenuItem(menu, toggleRenamePreset);
		MakeACopyMenuItem(menu, file);
		DeletePresetMenuItem(menu, file);
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
