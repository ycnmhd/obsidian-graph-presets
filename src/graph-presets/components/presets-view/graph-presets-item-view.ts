import { ItemView, WorkspaceLeaf } from "obsidian";
import { svgs } from "src/assets/svgs";
import { PresetsView } from "./presets-view";

export const GraphPresetsItemViewType = "graph-presets-list-view";
export const GraphPresetsItemViewIcon = {
	name: "graph-presets",
	svg: svgs["graph-presets"],
};

export class GraphPresetsItemView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}
	getViewType(): string {
		return GraphPresetsItemViewType;
	}
	getDisplayText(): string {
		return "Graph Presets";
	}
	getIcon(): string {
		return GraphPresetsItemViewIcon.name;
	}

	async onOpen(): Promise<void> {
		this.redraw();
	}
	private redraw() {
		const rootEl = this.containerEl.createDiv();
		PresetsView({ containerEl: rootEl as any });
		const contentEl = this.containerEl.children[1];
		contentEl.empty();
		contentEl.appendChild(rootEl);
	}
}
