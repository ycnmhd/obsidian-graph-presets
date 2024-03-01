import { App, Notice, PluginSettingTab, Setting } from "obsidian";
import { FolderSuggest } from "src/helpers/suggestions/folder-suggestions";
import { t } from "src/lang/text";
import GraphPresets from "src/main";
import { ac, getSnapshot } from "../../store/store";

export class SettingsView extends PluginSettingTab {
	constructor(app: App, plugin: GraphPresets) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "Graph Presets" });
		const store = getSnapshot();
		new Setting(containerEl)
			.setName(t.c.PRESETS_FOLDER)
			.setDesc(t.c.PRESETS_FOLDER_DESCRIPTION)
			.addSearch((cb) => {
				new FolderSuggest(app, cb.inputEl);
				cb.setPlaceholder(t.c.PRESETS_FOLDER_PLACEHOLDER)
					.setValue(store.preferences.presetsFolder)
					.onChange((e) => {
						if (e) {
							ac.setPresetsFolder(e);
						}
					});
			});
		new Setting(containerEl)
			.setName(t.c.AUTO_APPLY)
			.setDesc(t.c.AUTO_APPLY_DESCRIPTION)
			.addToggle((cb) => {
				cb.setValue(store.preferences.autoApplyPreset).onChange((e) => {
					ac.setAutoApplyPreset(e);
				});
			});
		new Setting(containerEl)
			.setName(t.c.GLOBAL_FILTER)
			.setDesc(t.c.GLOBAL_FILTER_DESCRIPTION)
			.addText((cb) => {
				cb
					.setPlaceholder(t.c.GLOBAL_FILTER_PLACEHOLDER)
					.setValue(store.preferences.globalFilter)
					.onChange((e) => {
						ac.setGlobalFilter(e);
					}).inputEl.style.width = "213px";
			});

		new Setting(containerEl)
			.setName(t.c.ENABLE_PRESET_COMMANDS)
			.setDesc(t.c.ENABLE_PRESET_COMMANDS_DESCRIPTION)
			.addToggle((cb) => {
				cb.setValue(store.preferences.enablePresetCommands).onChange(
					(e) => {
						ac.setEnablePresetCommands(e);

						new Notice(t.c.RESTART_TO_APPLY_CHANGES);
					}
				);
			});

		new Setting(containerEl)
			.setName(t.c.RESTORE_ZOOM_LEVEL)
			.setDesc(t.c.RESTORE_ZOOM_LEVEL_DESCRIPTION)
			.addToggle((cb) => {
				cb.setValue(store.preferences.restoreZoom).onChange((e) => {
					ac.setRestoreZoom(e);
				});
			});

		new Setting(containerEl)
			.setName(t.c.RESTORE_COLLAPSED_STATE)
			.setDesc(t.c.RESTORE_COLLAPSED_STATE_DESCRIPTION)
			.addToggle((cb) => {
				cb.setValue(store.preferences.restoreCollapsedState).onChange(
					(e) => {
						ac.setRestoreCollapsedState(e);
					}
				);
			});

		containerEl.createEl("h2", {
			text: "Default values of preset settings",
		});
	}
}
