import "src/assets/svg";
import { EventRef, Plugin, WorkspaceLeaf } from "obsidian";
import { applyGraphPreset } from "./commands/apply-graph-preset";
import { openGraphPresetsView } from "./commands/open-graph-presets-view";
import {
	GraphPresetsItemViewType,
	PresetsView,
} from "./views/presets/presets-view";
import { PersistedPresetMeta, PluginSettings } from "./types/settings/settings";
import { PresetView, PresetViewType } from "./views/preset/preset-view";
import { setViewState } from "./patches/set-view-state";
import { around } from "monkey-around";
import { SettingsView } from "./views/settings/settings-view";
import { activePresetCommands } from "./commands/active-graph-preset";
import { ac } from "./store/store";
import { fileMenuEventListeners } from "./event-listeners/file-menu-event-listeners";
import { unsubscribeFromEvent } from "./helpers/unsubscribe-from-event";
import { FileEvent } from "./store/slices/presets-slice";
import { fileEvent } from "./event-listeners/file-event";
import { onItemsChanged } from "./patches/on-items-change";
import { activeLeafEventListener } from "./event-listeners/active-leaf-event-listener";
import { Status } from "./helpers/status";

export type MarkdownPresetMeta = PersistedPresetMeta & {
	created: number;
	applied: number;
};

export class GraphPresets extends Plugin {
	private static instance: GraphPresets;
	private eventListenersRefs: Record<FileEvent, EventRef | undefined> = {
		delete: undefined,
		modify: undefined,
		rename: undefined,
	};

	status: Status = new Status();

	public static getInstance(): GraphPresets {
		return this.instance;
	}

	private _settings: PluginSettings;

	async onload() {
		GraphPresets.instance = this;
		this.registerViews();
		this.loadStaticCommands();
		this.registerMonkeyPatches();
		this.registerEventListeners();
		this.addRibbonIcon(
			"graph-presets",
			"Graph Presets",
			openGraphPresetsView.callback
		);
		app.workspace.onLayoutReady(() => {
			ac.loadPlugin();
		});
		this.status.onReady(() => {
			this.loadDynamicCommands();
		});
	}

	private loadStaticCommands() {
		this.addCommand(openGraphPresetsView);
		activePresetCommands.forEach((command) => {
			this.addCommand(command);
		});
	}
	private loadDynamicCommands() {
		if (this._settings.preferences.enablePresetCommands)
			applyGraphPreset().forEach((command) => {
				this.addCommand(command);
			});
	}

	private registerEventListeners() {
		this.registerEvent(fileMenuEventListeners());
		this.registerEvent(activeLeafEventListener());
	}
	private registerMonkeyPatches() {
		// inspired from https://github.com/zsviczian/obsidian-excalidraw-plugin/blob/da89e32213be8cb21ec8e0705ab5d5f8bcbac3dc/src/main.ts#L259
		this.register(around(WorkspaceLeaf.prototype, { setViewState }));

		this.register(
			around((app as any).internalPlugins.plugins.starred.instance, {
				onItemsChanged,
			})
		);
	}

	private registerViews() {
		this.addSettingTab(new SettingsView(this.app, this));
		this.registerView(
			GraphPresetsItemViewType,
			(leaf) => new PresetsView(leaf)
		);
		this.registerView(PresetViewType, (leaf) => new PresetView(leaf));
	}

	get settings(): PluginSettings {
		return JSON.parse(JSON.stringify(this._settings));
	}

	async setSettings(settings: PluginSettings) {
		this._settings = settings;
		await this.saveData(settings);
	}

	toggleFileEventListener(event: FileEvent, enable: boolean) {
		if (enable) {
			if (!this.eventListenersRefs[event]) {
				const eventRef = fileEvent[event]();
				this.registerEvent(eventRef);
				this.eventListenersRefs[event] = eventRef;
			}
		} else {
			const ref = this.eventListenersRefs[event];
			if (ref) {
				unsubscribeFromEvent(ref);
				this.eventListenersRefs[event] = undefined;
			}
		}
	}
}
