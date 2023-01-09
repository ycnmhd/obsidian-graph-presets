import { WorkspaceLeaf, TFile, TFolder } from "obsidian";
import { fileIsPreset } from "../helpers/file-is-preset";
import { ApplyPresetMenuItem } from "../context-menu-items/apply-preset-menu-item";
import { CreatePresetMenuItem } from "../context-menu-items/create-preset-menu-item";
import { OpenAsPresetMenuItem } from "../context-menu-items/open-as-preset-menu-item";
import { UpdatePresetMenuItem } from "../context-menu-items/update-preset-menu-item";
import { PresetViewType } from "../views/preset/preset-view";

export const fileMenuEventListeners = () =>
	app.workspace.on("file-menu", async (menu, file, source, leaf) => {
		if (source === "more-options") {
			if (fileIsPreset(file)) {
				if (leaf?.view.getViewType() !== PresetViewType)
					OpenAsPresetMenuItem(menu, leaf as WorkspaceLeaf);
				UpdatePresetMenuItem(menu, file);
				ApplyPresetMenuItem(menu, file as TFile);
			}
		} else if (
			source === "file-explorer-context-menu" ||
			source === "graph-presets-context-menu"
		) {
			if (fileIsPreset(file)) {
				UpdatePresetMenuItem(menu, file);
				ApplyPresetMenuItem(menu, file as TFile);
			} else if (file instanceof TFolder)
				await CreatePresetMenuItem(menu, file);
		}
	});
