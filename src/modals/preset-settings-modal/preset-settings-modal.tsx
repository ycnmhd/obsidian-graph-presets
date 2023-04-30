import { Modal, Setting, TFile } from "obsidian";
import { Root } from "react-dom/client";
import { GetPresetDTO } from "src/helpers/get-preset";
import { getFileByCtime } from "src/helpers/obsidian/graph/helpers/get-file-by-ctime";
import { FileSuggest } from "src/helpers/suggestions/folder-suggestions";
import { t } from "src/lang/text";
import { ac, getSnapshot } from "src/store/store";
import { PresetView } from "src/views/preset/preset-view";

export class PresetSettingsModal extends Modal {
	container: HTMLDivElement;
	rootContainer: Root;

	constructor(private dto: GetPresetDTO, private view: PresetView) {
		super(app);
		this.titleEl.setText(t.c.PRESET_SETTINGS);
	}

	onOpen() {
		const { contentEl } = this;

		const verticalTabContentContainer = contentEl.createDiv(
			"vertical-tab-content-container"
		);
		const verticalTabContent = verticalTabContentContainer.createDiv(
			"vertical-tab-content"
		);
		const store = getSnapshot();

		const preset = store.presets.meta[this.dto.created];

		let file: TFile | undefined;
		if (preset.localGraphFile) file = getFileByCtime(preset.localGraphFile);

		new Setting(verticalTabContent)
			.setName(t.c.LOCAL_GRAPH_FILE)
			.setDesc(t.c.LOCAL_GRAPH_FILE_DESCRIPTION)
			.addSearch((cb) => {
				new FileSuggest(app, cb.inputEl);
				cb.setPlaceholder(t.c.LOCAL_GRAPH_FILE_PLACEHOLDER)
					.setValue(file ? file.path : "")
					.onChange((e) => {
						let localGraphFile: number | undefined;
						if (e) {
							const file = app.vault.getAbstractFileByPath(e);
							if (file instanceof TFile) {
								localGraphFile = file.stat.ctime;
							}
						}
						ac.setLocalFile({
							created: this.dto.created,
							localGraphFile,
						});
						this.view.render();
					});
			});

		new Setting(verticalTabContent)
			.setName(t.c.AUTO_APPLY)
			.setDesc(t.c.AUTO_APPLY_DESCRIPTION)
			.addToggle((cb) => {
				cb.setValue(!preset.disableAutoApply).onChange((e) => {
					ac.toggleAutoApply({
						created: this.dto.created,
					});
				});
			});

		new Setting(verticalTabContent)
			.setName(t.c.AUTO_BIND_PRESET)
			.setDesc(t.c.AUTO_BIND_PRESET_DESCRIPTION)
			.addToggle((cb) => {
				cb.setValue(!preset.disableAutoBindToLocalGraph).onChange(
					(e) => {
						ac.toggleAutoBindToLocalGraph({
							created: this.dto.created,
						});
					}
				);
			});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
