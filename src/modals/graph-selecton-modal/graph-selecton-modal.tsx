import { Modal, WorkspaceLeaf } from "obsidian";
import { createRoot, Root } from "react-dom/client";
import { t } from "src/lang/text";
import { GraphLeafList } from "./graph-leaf-list";

export class GraphSelectionModal extends Modal {
	container: HTMLDivElement;
	rootContainer: Root;
	private selectedLeaf: Promise<WorkspaceLeaf>;
	private onSelection: (leaf: WorkspaceLeaf) => void;
	constructor() {
		super(app);
		this.titleEl.setText(t.c.SELECT_GRAPH);
		this.selectedLeaf = new Promise((resolve) => {
			this.onSelection = resolve;
		});
	}

	onOpen() {
		this.initRootContainer();
		this.render();
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}

	initRootContainer() {
		this.container = this.contentEl.createDiv("container");
		this.container.setAttribute("id", "graph-selection-modal-container");
		(this.contentEl.parentElement as HTMLDivElement).style.setProperty(
			"width",
			"250px"
		);
		this.rootContainer = createRoot(this.container);
	}
	render() {
		this.rootContainer.render(
			<GraphLeafList onSelection={this.onSelection} />
		);
	}

	get selected(): Promise<WorkspaceLeaf> {
		return this.selectedLeaf;
	}
}
