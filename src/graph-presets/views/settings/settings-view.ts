import { App, Notice, PluginSettingTab, Setting } from "obsidian";
import { FolderSuggest } from "src/graph-presets/helpers/suggestions/folder-suggestions";
import { t } from "src/graph-presets/lang/text";
import GraphPresets from "src/main";

export class SettingsView extends PluginSettingTab {
	constructor(app: App, private plugin: GraphPresets) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "Graph Presets" });

		new Setting(containerEl)
			.setName(t.c.PRESETS_FOLDER)
			.setDesc(t.c.PRESETS_FOLDER_DESCRIPTION)
			.addSearch((cb) => {
				
				new FolderSuggest(app, cb.inputEl);
				cb.setPlaceholder(t.c.PRESETS_FOLDER_PLACEHOLDER)
					.setValue(this.plugin.settings.preferences.presetsFolder)
					.onChange((e) => {
						if (e) {
							this.plugin.settings.preferences.presetsFolder = e;
						}
					});
			});

		new Setting(containerEl)
			.setName(t.c.ENABLE_PRESET_COMMANDS)
			.setDesc(t.c.ENABLE_PRESET_COMMANDS_DESCRIPTION)
			.addToggle((cb) => {
				cb.setValue(
					this.plugin.settings.preferences.enablePresetCommands
				).onChange((e) => {
					this.plugin.settings.preferences.enablePresetCommands = e;

					new Notice(
						t.c.RESTART_TO_APPLY_CHANGES,
					);
				});
			});
	}

	onClose() {
		this.plugin.saveSettings();
	}
}
