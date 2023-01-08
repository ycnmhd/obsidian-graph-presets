import { TextFileView, TFile, Menu, WorkspaceLeaf, Notice } from "obsidian";
import { t } from "src/graph-presets/lang/text";
import { Router } from "./helpers/router";
import { PresetActionButtons } from "./components/preset-action-buttons";
import { PresetContent } from "./components/preset-content";
import { GraphSettings } from "src/types/graph-settings";
import { parseMarkDownPreset } from "src/graph-presets/monkey-patches/apply-markdown-preset/helpers/parse-markdown-preset/parse-markdown-preset";
import { mapPresetToMarkdown } from "src/graph-presets/actions/save-preset-to-markdown/helpers/map-preset-to-markdown";
import { getSnapshot } from "src/graph-presets/store/store";
import { obsidian } from "src/obsidian/obsidian";
import { logger } from "src/graph-presets/helpers/logger";

const isPresetNote = (data: string) => {
	return /---\s+graph-presets-plugin: basic/.test(data);
};

export type UpdateAttribute = <k extends keyof GraphSettings>(
	name: k,
	value: GraphSettings[k]
) => void;

type State = {
	preset?: GraphSettings;
	parsingError: string;
};
export const PresetViewType = "markdown-preset-view";

export class PresetView extends TextFileView {
	private actionButtons: PresetActionButtons;
	private presetContent: PresetContent;
	private currentFile: TFile;
	private state: State = {
		preset: undefined,
		parsingError: "",
	};
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
		if (isPresetNote(data)) {
			this.parsePreset();
			if (this.preset) {
				this.applyPreset(this.preset);
			}
			this.presetContent.render();
			if (this.currentFile !== this.file) {
				this.currentFile = this.file;
				this.actionButtons.render();
			}
		}
	}

	getViewData(): string {
		return this.data;
	}

	onunload(): void {}

	clear(): void {}

	/*  */
	private parsePreset() {
		try {
			const preset = parseMarkDownPreset(this.data) as GraphSettings;
			this.state.preset = preset;
			this.state.parsingError = "";
		} catch (e) {
			this.state.parsingError = e.message;
			new Notice(t.c.MARKDOWN_PARSING_ERROR);
			Router.getInstance().setFileType({
				path: this.file.path,
				type: "markdown",
				leaf: this.leaf,
			});

			logger.error(e);
		}
	}

	get preset(): GraphSettings | undefined {
		return this.state.preset;
	}
	get parsingError(): string {
		return this.state.parsingError;
	}

	updateAttribute: UpdateAttribute = (name, value) => {
		if (!this.state.preset) return;
		this.state.preset[name] = value;
		this.applyPreset({ [name]: value });
		this.savePreset();
	};

	timeout: ReturnType<typeof setTimeout>;
	savePreset = () => {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.data = mapPresetToMarkdown(this.state.preset as GraphSettings);
			this.save();
		}, 200);
	};

	applyPreset = (preset: Partial<GraphSettings>) => {
		const p = getSnapshot().presets.meta[this.file.stat.ctime];
		if (!p?.disableAutoApply) {
			obsidian.graph.setSettings({
				settings: preset,
				openGraph: false,
				dto: { created: p.created },
			});
		}
	};
}
