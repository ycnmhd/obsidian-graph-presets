import { createRoot, Root } from "react-dom/client";
import { PresetView } from "../../preset-view";
import { PresetWrapper } from "src/views/preset/components/preset-content/components/preset/preset-wrapper";
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
		const view = (
			<div className="flex justify-center items-center h-full ">
				<PresetWrapper viewStore={this.view.store} />
			</div>
		);
		this.rootContainer.render(view);
	}

	render() {}

	unmount() {
		this.rootContainer.unmount();
		this.container.remove();
	}
}
