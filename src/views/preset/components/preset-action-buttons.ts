import { TextFileView } from "obsidian";
import { ac, getSnapshot } from "src/store/store";
import { t } from "src/lang/text";
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
		this.addAction("file-text", t.c.OPEN_AS_MARKDOWN, () => {
			Router.getInstance().setFileType({
				leaf: this.view.leaf,
				type: "markdown",
				path: this.view.file.path,
			});
		});
		this.buttons.disableAutoApply = this.addAction(
			"refresh-ccw",
			t.c.AUTO_APPLY,
			() => {
				ac.toggleAutoApply({
					created: this.view.file.stat.ctime,
				});
				setTimeout(() => {
					this.render();
				}, 200);
			}
		);
		this.addAction("arrow-down", t.c.UPDATE, () => {
			ac.updatePreset({
				created: this.view.file.stat.ctime,
			});
		});
		this.addAction("check", t.c.APPLY, () => {
			ac.applyPreset({
				created: this.view.file.stat.ctime,
			});
		});
	}

	render() {
		const disableAutoApply =
			getSnapshot().presets.meta[this.view.file.stat.ctime]
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
