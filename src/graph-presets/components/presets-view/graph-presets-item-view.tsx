import { ItemView, WorkspaceLeaf } from "obsidian";
import { svgs } from "src/assets/svgs";
import { PresetsView } from "./presets-view";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "src/graph-presets/components/shared/error-fallback";

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
		const root = createRoot(this.containerEl.children[1]);
		root.render(
			<StrictMode>
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<PresetsView />
				</ErrorBoundary>
			</StrictMode>
		);
	}

	async onClose() {
		ReactDOM.unmountComponentAtNode(this.containerEl);
	}
	
}
