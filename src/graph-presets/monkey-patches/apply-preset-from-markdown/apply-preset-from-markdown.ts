import { MarkdownView, Menu, TFile, WorkspaceLeaf } from "obsidian";
import { FRONTMATTER_KEY } from "src/graph-presets/helpers/constants";
import { parseAndApplyMarkdownPreset } from "src/graph-presets/monkey-patches/apply-preset-from-markdown/helpers/parse-and-apply-markdown-preset";
import { GraphPresetsItemViewIcon } from "../../components/presets-view/graph-presets-item-view";

export const applyPresetFromMarkdown = (
	menu: Menu,
	file: TFile,
	leaf: WorkspaceLeaf
) => {
	const cache = app.metadataCache.getFileCache(file);
	if (!cache?.frontmatter || !cache.frontmatter[FRONTMATTER_KEY]) return;

	menu.addItem((item) => {
		item.setTitle("Apply Graph Preset")
			.setIcon(GraphPresetsItemViewIcon.name)
			.setSection("pane")
			.onClick(async () => {
				await parseAndApplyMarkdownPreset({
					view: leaf.view as MarkdownView,
				});
			});
	});
	//@ts-ignore
	menu.items.unshift(menu.items.pop());
};
