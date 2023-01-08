import { TextFileView, TFile, Menu, WorkspaceLeaf } from "obsidian";
import { t } from "src/graph-presets/lang/text";
import { Router } from "./helpers/router";
import { PresetActionButtons } from "./components/preset-action-buttons";
import { PresetContent } from "./components/preset-content";

const isPresetNote = (data: string) => {
	return /---\s+graph-presets-plugin: basic/.test(data);
};

export const PresetViewType = "markdown-preset-view";

export class PresetView extends TextFileView {
	private actionButtons: PresetActionButtons;
	private presetContent: PresetContent;
	private currentFile: TFile;
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		this.actionButtons = new PresetActionButtons(
			this,
			this.addAction.bind(this)
		);
		this.presetContent = new PresetContent(this);
	}

	getDisplayText(): string {
		return this.file?.basename || t.c.PRESET;
	}

	getViewType(): string {
		return PresetViewType;
	}

	onPaneMenu(menu: Menu, source: string, callSuper = true): void {
		if (source !== "more-options") {
			super.onPaneMenu(menu, source);
			return;
		}
		menu.addItem((item) => {
			item.setTitle("Open as Markdown")
				.setIcon("document")
				.onClick(() => {
					Router.getInstance().setFileType({
						path: this.file.path,
						type: "markdown",
						leaf: this.leaf,
					});
				});
		}).addSeparator();

		if (callSuper) {
			super.onPaneMenu(menu, source);
		}
	}

	setViewData(data: string): void {
		this.data = data;
		if (this.currentFile !== this.file) {
			if (isPresetNote(data)) {
				this.actionButtons.render();
				this.presetContent.render();
				this.currentFile = this.file;
			}
		}
	}

	getViewData(): string {
		return this.data;
	}

	onunload(): void {}

	clear(): void {}
}
