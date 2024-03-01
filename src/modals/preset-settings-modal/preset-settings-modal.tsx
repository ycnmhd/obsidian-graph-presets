import { Modal, Setting, TFile } from "obsidian";
import { Root } from "react-dom/client";
import { GetPresetDTO } from "src/helpers/get-preset";
import { getFileByCtime } from "src/helpers/obsidian/graph/helpers/get-file-by-ctime";
import { FileSuggest } from "src/helpers/suggestions/folder-suggestions";
import { t } from "src/lang/text";
import { ac, getSnapshot } from "src/store/store";
import { PresetView } from "src/views/preset/preset-view";
import { PresetTarget } from "src/types/settings/settings";

export class PresetSettingsModal extends Modal {
	container: HTMLDivElement;
	rootContainer: Root;

	constructor(private dto: GetPresetDTO, private view: PresetView) {
		super(app);
		this.titleEl.setText(t.c.PRESET_SETTINGS);
	}

	onOpen() {
		const { contentEl } = this;

		const render = () => {
			const store = getSnapshot();

			const preset = store.presets.meta[this.dto.created];

			let file: TFile | undefined;
			if (preset.localGraphFile)
				file = getFileByCtime(preset.localGraphFile);

			contentEl.empty();
			const verticalTabContentContainer = contentEl.createDiv(
				"vertical-tab-content-container"
			);
			const verticalTabContent = verticalTabContentContainer.createDiv(
				"vertical-tab-content"
			);

			new Setting(verticalTabContent)
				.setName("Preset target")
				.addDropdown((cb) => {
					cb.addOptions({
						local: "Local graph",
						global: "Global graph",
					});
					cb.setValue(preset.target).onChange((e) => {
						ac.setPresetTarget({
							created: this.dto.created,
							target: e as PresetTarget,
						});
						render();
					});
				});

			if (preset.target === "local") {
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
									const file =
										app.vault.getAbstractFileByPath(e);
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
			}
		};
		render();
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
