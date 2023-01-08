import { ItemView, WorkspaceLeaf } from "obsidian";
import { svgs } from "src/assets/svgs";
import { PresetsView as P } from "../../components/presets-view/presets-view";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "src/graph-presets/components/shared/error-fallback";
import { Provider } from "react-redux";
import { store } from "src/graph-presets/store/store";

export const GraphPresetsItemViewType = "graph-presets-list-view";
export const GraphPresetsItemViewIcon = {
	name: "graph-presets",
	svg: svgs["graph-presets"],
};

export class PresetsView extends ItemView {
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
		this.contentEl.style.setProperty("padding", "0");
		const root = createRoot(this.containerEl.children[1]);
		root.render(
			<StrictMode>
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<Provider store={store}>
						<P />
					</Provider>
				</ErrorBoundary>
			</StrictMode>
		);
	}

	async onClose() {
		ReactDOM.unmountComponentAtNode(this.containerEl);
	}

	static enable() {
		app.workspace.onLayoutReady(async () => {
			const leafs = app.workspace.getLeavesOfType(
				GraphPresetsItemViewType
			);
			await Promise.all(
				leafs
					.filter((leaf) => !(leaf.view instanceof PresetsView))
					.map(async (leaf) => {
						return await leaf.setViewState({ type: "empty" });
					})
			);
			const leaf = leafs.at(-1) || app.workspace.getLeftLeaf(false);
			leaf.setViewState({
				type: GraphPresetsItemViewType,
				active: true,
			});
		});
	}
}
