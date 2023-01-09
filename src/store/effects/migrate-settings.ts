import { Notice } from "obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { ac, getSnapshot } from "../store";
import { GraphPresets } from "src/graph-presets";
import { logger } from "src/helpers/logger";
import { t } from "src/lang/text";
import {
	CURRENT_VERSION,
	PluginSettings,
} from "../../settings/default-settings";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { acu } from "../ac";

const migrations = {
	"0.5.0": async () => {
		const store = getSnapshot();
		const settings = GraphPresets.getInstance()
			.settings as PluginSettings & { __migratedData__: any[] };

		if ("presets" in settings && typeof settings.presets === "object") {
			const presets = settings.presets as {
				[key: string]: {
					settings: GraphSettings;
					meta: {
						created: number;
						updated: number;
						applied: number;
					};
				};
			};

			try {
				const folderPath =
					store.preferences.presetsFolder + "/migrated/0.5.0";
				for (const [name, preset] of Object.entries(presets)) {
					await ac.createPreset({
						presetName: name,
						preset: preset.settings,
						folderPath,
						dontOpenAfterCreation: true,
					});
				}
				if (!settings.__migratedData__) settings.__migratedData__ = [];
				settings.__migratedData__.push({
					previousVersion: "0.4.0",
					newVersion: "0.5.0",
					date: new Date().toISOString(),
					data: {
						presets: settings.presets,
					},
				});
				delete settings.presets;

				new Notice(t.c.PRESETS_MIGRATED);
			} catch (e) {
				logger.error(e);
				new Notice(t.c.ERROR_MIGRATING_PRESETS + ": " + e.message);
			}
		}
	},
};

export const migrateSettings = async () => {
	const plugin = GraphPresets.getInstance();

	if (plugin.settings.version === CURRENT_VERSION) return;
	if (!plugin.settings.version) {
		await migrations["0.5.0"]();
	}
	await plugin.setVersion(CURRENT_VERSION);
};

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	actionCreator: acu.refreshCache.fulfilled,
	effect: migrateSettings,
});

export const migrateSettingsMiddleware = listenerMiddleware.middleware;
