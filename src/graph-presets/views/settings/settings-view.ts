import { App, Notice, PluginSettingTab, Setting } from "obsidian";
import { FolderSuggest } from "src/graph-presets/helpers/suggestions/folder-suggestions";
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
			.setName("Default location")
			.setDesc("Presets will be created inside this folder")
			.addSearch((cb) => {
				
				new FolderSuggest(app, cb.inputEl);
				cb.setPlaceholder("Example: path/to/folder")
					.setValue(this.plugin.settings.preferences.presetsFolder)
					.onChange((e) => {
						if (e) {
							this.plugin.settings.preferences.presetsFolder = e;
						}
					});
			});

		new Setting(containerEl)
			.setName("Enable preset commands")
			.setDesc("Enable preset commands in the command palette")
			.addToggle((cb) => {
				cb.setValue(
					this.plugin.settings.preferences.enablePresetCommands
				).onChange((e) => {
					this.plugin.settings.preferences.enablePresetCommands = e;

					new Notice(
						"You need to reload Obsidian for this change to take effect"
					);
				});
			});
	}

	onClose() {
		this.plugin.saveSettings();
	}
}
