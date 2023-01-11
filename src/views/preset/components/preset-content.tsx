import { createRoot, Root } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "src/store/store";
import { PresetView } from "../preset-view";
import { PresetPreview } from "./preset-preview/preset-preview";

export class PresetContent {
	private rootContainer: Root;
	private container: HTMLDivElement;

	constructor(private view: PresetView) {
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
					{this.view.file && this.view.preset ? (
						<PresetPreview
							ctime={this.view.file.stat.ctime}
							key={this.view.file.stat.ctime}
							preset={this.view.preset}
							updateAttribute={this.view.updateAttribute}
						/>
					) : this.view.parsingError ? (
						<div className="text-center">
							<p className="text-3xl ">Could not parse preset</p>
						</div>
					) : undefined}
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
