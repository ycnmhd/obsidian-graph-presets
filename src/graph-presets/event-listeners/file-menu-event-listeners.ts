import { WorkspaceLeaf, TFile, TFolder } from "obsidian";
import { fileIsPreset } from "../helpers/file-is-preset";
import { applyMarkdownPresetPatch } from "../monkey-patches/apply-markdown-preset/apply-markdown-preset-patch";
import { createMarkdownPresetPatch } from "../monkey-patches/create-markdown-preset-patch";
import { renderLeafAsPreset } from "../monkey-patches/render-leaf-as-preset";
import { updateMarkdownPresetPatch } from "../monkey-patches/update-markdown-preset-patch";
import { PresetViewType } from "../views/preset/preset-view";

export const fileMenuEventListeners = () =>
	app.workspace.on("file-menu", async (menu, file, source, leaf) => {
		if (source === "more-options") {
			if (fileIsPreset(file)) {
				if (leaf?.view.getViewType() !== PresetViewType)
					renderLeafAsPreset(menu, leaf as WorkspaceLeaf);
				updateMarkdownPresetPatch(menu, file);
				applyMarkdownPresetPatch(menu, file as TFile);
			}
		} else if (
			source === "file-explorer-context-menu" ||
			source === "graph-presets-context-menu"
		) {
			if (fileIsPreset(file)) {
				updateMarkdownPresetPatch(menu, file);
				applyMarkdownPresetPatch(menu, file as TFile);
			} else if (file instanceof TFolder)
				await createMarkdownPresetPatch(menu, file);
		}
	});
