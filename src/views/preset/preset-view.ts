import { Menu, Notice, TextFileView, TFile, WorkspaceLeaf } from "obsidian";
import { t } from "src/lang/text";
import { Router } from "./helpers/router";
import { PresetActionButtons } from "./components/preset-action-buttons";
import { PresetContent } from "./components/preset-content/preset-content";
import { GraphSettings } from "src/types/graph-settings";
import { parseMarkDownPreset } from "src/helpers/parse-markdown-preset/parse-markdown-preset";
import { mapPresetToMarkdown } from "src/helpers/save-preset-to-markdown/helpers/map-preset-to-markdown";
import { ac } from "src/store/store";
import { logger } from "src/helpers/logger";
import { OpenAsMarkdownMenuItem } from "src/context-menu-items/open-as-markdown-menu-item";
import {
	addView,
	removeView,
} from "src/store/effects/save-file/helpers/file-views";
import { Store } from "src/helpers/store";
import { filesByCtime } from "src/store/cache/files-by-time";

export type State = {
	created: number | null;
	parsingError: string | null;
};
export const PresetViewType = "markdown-preset-view";

export class PresetView extends TextFileView {
	private actionButtons: PresetActionButtons;
	private presetContent: PresetContent;
	private savePresetTimeout: ReturnType<typeof setTimeout> | undefined;
	store = new Store<State>({
		created: 0,
		parsingError: "",
	});

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		this.actionButtons = new PresetActionButtons(
			this,
			this.addAction.bind(this)
		);
		this.presetContent = new PresetContent(this);
	}

	onLoadFile(file: TFile): Promise<void> {
		addView(this);
		this.store.set({ created: file.stat.ctime, parsingError: "" });
		this.actionButtons.render();
		return super.onLoadFile(file);
	}

	onUnloadFile(file: TFile): Promise<void> {
		removeView(this, file.stat.ctime);
		this.store.set({ created: null, parsingError: null });
		return super.onUnloadFile(file);
	}

	onPaneMenu(menu: Menu, source: string, callSuper = true): void {
		if (source !== "more-options") {
			super.onPaneMenu(menu, source);
			return;
		}
		OpenAsMarkdownMenuItem(menu, this.leaf);

		if (callSuper) {
			super.onPaneMenu(menu, source);
		}
	}

	setViewData(data: string): void {
		this.data = data;
		this.parsePreset();
	}
	private parsePreset() {
		try {
			const preset = parseMarkDownPreset(this.data) as GraphSettings;
			ac.setPreset({
				created: this.file?.stat?.ctime,
				preset,
			});
		} catch (e) {
			logger.error(e);
			new Notice(t.c.MARKDOWN_PARSING_ERROR);
			this.store.set({ parsingError: e.message });
			ac.setPreset({
				created: this.file?.stat?.ctime,
				preset: null,
			});
			Router.getInstance().setFileType({
				path: this.file.path,
				type: "markdown",
				leaf: this.leaf,
			});

			logger.error(e);
		}
	}

	savePreset = async (preset: GraphSettings, created: number) => {
		if (this.savePresetTimeout) clearTimeout(this.savePresetTimeout);

		if (!this.file) {
			// attempt to reopen file
			if (filesByCtime.current[created])
				await Router.getInstance().setFileType({
					path: filesByCtime.current[created].path,
					type: PresetViewType,
					leaf: this.leaf,
				});
			if (!this.file) {
				new Notice(t.c.SAVE_ERROR);
				throw new Error("view does not have a file");
			}
		}
		this.savePresetTimeout = setTimeout(async () => {
			try {
				this.data = mapPresetToMarkdown(preset);
				await this.save();
			} catch (e) {
				logger.error(e);
				new Notice(t.c.SAVE_ERROR);
			}
		}, 200);
	};

	getDisplayText(): string {
		return this.file?.basename || t.c.PRESET;
	}

	getViewType(): string {
		return PresetViewType;
	}

	getViewData(): string {
		return this.data;
	}

	onunload(): void {}

	clear(): void {}

	render(): void {
		this.actionButtons.render();
	}
}
