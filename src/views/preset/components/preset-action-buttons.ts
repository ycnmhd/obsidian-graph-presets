import { ac, getSnapshot } from "src/store/store";
import { t } from "src/lang/text";
import { Router } from "../helpers/router";
import { GraphPresets } from "src/graph-presets";
import { PresetSettingsModal } from "src/modals/preset-settings-modal/preset-settings-modal";
import { PresetView } from "../preset-view";
import { getFileByCtime } from "src/helpers/obsidian/graph/helpers/get-file-by-ctime";

export class PresetActionButtons {
	private buttons: {
		unlinkPreset: HTMLElement | null;
	};
	constructor(
		private view: PresetView,
		private addAction: (
			icon: string,
			text: string,
			callback: () => void
		) => HTMLElement
	) {
		this.buttons = {
			unlinkPreset: null,
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
		this.addAction("settings", t.c.PRESET_SETTINGS, () => {
			new PresetSettingsModal(
				{
					created: this.view.file.stat.ctime,
				},
				this.view
			).open();
		});
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
		this.buttons.unlinkPreset = this.addAction(
			"link",
			t.c.UNLINK_LOCAL_PRESET,
			() => {
				ac.setLocalFile({
					created: this.view.file.stat.ctime,
				});
				this.render();
			}
		);
		this.buttons.unlinkPreset.style.visibility = "hidden";
	}

	render() {
		if (!GraphPresets.getInstance().status.ready) {
			this.view.contentEl.classList.add("is-loading");
		} else {
			this.view.contentEl.classList.remove("is-loading");
			if (this.view.file) {
				const store = getSnapshot();
				const meta = store.presets.meta[this.view.file.stat.ctime];

				if (this.buttons.unlinkPreset)
					if (meta?.localGraphFile) {
						this.buttons.unlinkPreset.style.visibility = "visible";
						const file = getFileByCtime(meta?.localGraphFile);
						this.buttons.unlinkPreset.setAttribute(
							"aria-label",
							t.c.UNLINK_LOCAL_PRESET + '"' + file?.basename + '"'
						);
					} else {
						this.buttons.unlinkPreset.style.visibility = "hidden";
					}
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
