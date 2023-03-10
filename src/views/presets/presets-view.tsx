import { ItemView, WorkspaceLeaf } from "obsidian";
import { PresetsList as P } from "./components/presets-list/presets-list";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "src/views/shared/error-fallback";
import { Provider } from "react-redux";
import { ac, store } from "src/store/store";

export const GraphPresetsItemViewType = "graph-presets-list";
export const GraphPresetsItemViewIcon = {
	name: "graph-presets",
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
		ac.presetsView();
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
		ac.presetsView();
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
