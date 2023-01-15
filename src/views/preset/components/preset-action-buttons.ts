import { getIcon, TextFileView } from "obsidian";
import { ac, getSnapshot } from "src/store/store";
import { t } from "src/lang/text";
import { Router } from "../helpers/router";
import { GraphPresets } from "src/graph-presets";

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
		GraphPresets.getInstance().status.onReady(() => {
			this.render();
		});
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
			"toggle-right",
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
		const preset = this.view.file
			? getSnapshot().presets.meta[this.view.file.stat.ctime]
			: undefined;
		if (preset) {
			if (this.buttons.disableAutoApply) {
				const disableAutoApply = preset.disableAutoApply || false;
				const disableAutoApplyUpToDate =
					this.buttons.disableAutoApply.dataset[
						"disableAutoApply"
					] === disableAutoApply.toString();

				if (!disableAutoApplyUpToDate) {
					this.buttons.disableAutoApply.innerHTML = "";
					const icon = (
						disableAutoApply
							? getIcon("toggle-left")
							: getIcon("toggle-right")
					) as SVGSVGElement;
					this.buttons.disableAutoApply.appendChild(icon);
					this.buttons.disableAutoApply.dataset["disableAutoApply"] =
						disableAutoApply.toString();
					this.buttons.disableAutoApply.style.setProperty(
						"opacity",
						disableAutoApply ? "0.3" : "1"
					);
				}
			}
		}
		if (!GraphPresets.getInstance().status.ready) {
			this.view.contentEl.classList.add("is-loading");
		} else {
			this.view.contentEl.classList.remove("is-loading");
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
