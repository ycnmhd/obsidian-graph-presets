import { Notice } from "obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { actions } from "../actions/actions";
import { GraphPresets } from "../graph-presets";
import { logger } from "../helpers/logger";
import { t } from "../lang/text";
import { CURRENT_VERSION } from "./default-settings";

const migrations = {
	"0.5.0": async () => {
		const plugin = GraphPresets.getInstance();
		const settings = plugin.settings as any;

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
					plugin.store.getSnapshot().settings.preferences
						.presetsFolder + "/migrated/0.5.0";
				for (const [name, preset] of Object.entries(presets)) {
					await actions.createPreset(
						name,
						preset.settings,
						folderPath
					);
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
				
				new Notice(t.c.PRESETS_MIGRATED)
			} catch (e) {

				logger.error(e);
				new Notice(t.c.ERROR_MIGRATING_PRESETS+": " + e.message);
			}
		}
	},
};

export const migrateSettings = async () => {
	const plugin = GraphPresets.getInstance();
	const settings = plugin.settings as any;
	if (settings.version === CURRENT_VERSION) return;
	if (!settings.version) {
		await migrations["0.5.0"]();
	}
    settings.version = CURRENT_VERSION;
    await plugin.saveSettings();
};
