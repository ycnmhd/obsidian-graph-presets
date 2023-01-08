import { TextFileView } from "obsidian";
import { createRoot, Root } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "src/graph-presets/store/store";
import { PresetPreview } from "./preset-preview/preset-preview";

export class PresetContent {
	private rootContainer: Root;
	private container: HTMLDivElement;
	constructor(private view: TextFileView) {
		this.mount();
	}

	private mount() {
		const contentEl = this.view.contentEl;
		contentEl.style.setProperty(
			"background-color",
			"var(--background-modifier-cover)"
		);
		this.container = contentEl.createDiv("container");
		this.container.style.setProperty("height", "100%");
		this.rootContainer = createRoot(this.container);
	}

	render() {
		const view = (
			<div className="flex justify-center items-center h-full ">
				<Provider store={store}>
					<PresetPreview
						ctime={this.view.file.stat.ctime}
						key={this.view.file.stat.ctime}
					/>
				</Provider>
			</div>
		);
		this.rootContainer.render(view);
	}

	unmount() {
		this.rootContainer.unmount();
		this.container.remove();
	}
}
