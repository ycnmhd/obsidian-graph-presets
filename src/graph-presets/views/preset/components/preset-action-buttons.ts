import { TextFileView } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";
import { GraphPresets } from "src/graph-presets/graph-presets";
import { t } from "src/graph-presets/lang/text";
import { Router } from "../helpers/router";

export class PresetActionButtons {
	private buttons: {
		disableAutoApply: HTMLElement | null;
	};
	constructor(
		private view: TextFileView,
		private addAction: (
			icon: string,
			text: string,
			callback: () => void
		) => HTMLElement
	) {
		this.buttons = {
			disableAutoApply: null,
		};
		this.mount();
	}

	private mount() {
		this.buttons.disableAutoApply = this.addAction(
			"file-symlink",
			t.c.AUTO_APPLY,
			() => {
				actions.toggleAutoApply({
					created: this.view.file.stat.ctime,
					file: this.view.file,
				});
				this.render();
			}
		);
		this.addAction("file-text", t.c.OPEN_AS_MARKDOWN, () => {
			Router.getInstance().setLeafType({
				leaf: this.view.leaf,
				type: "markdown",
			});
		});
		this.addAction("edit", t.c.UPDATE, () => {
			actions.updatePreset({
				created: this.view.file.stat.ctime,
				file: this.view.file,
			});
		});
		this.addAction("file-check", t.c.APPLY, () => {
			actions.applyPreset({
				created: this.view.file.stat.ctime,
				file: this.view.file,
			});
		});
	}

	render() {
		const plugin = GraphPresets.getInstance();
		const disableAutoApply =
			plugin.store.getSnapshot().state.meta[this.view.file.stat.ctime]
				.disableAutoApply;
		if (this.buttons.disableAutoApply) {
			if (disableAutoApply) {
				this.buttons.disableAutoApply.classList.add("opacity-20");
			} else {
				this.buttons.disableAutoApply.classList.remove("opacity-20");
			}
		}
	}

	unmount() {
		Object.values(this.buttons).forEach((button) => {
			if (button) {
				button.remove();
			}
		});
	}
}
