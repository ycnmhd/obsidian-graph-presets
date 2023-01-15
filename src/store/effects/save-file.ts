import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { acu } from "../ac";
import { RootState } from "../store";
import { obsidian } from "src/helpers/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { Notice } from "obsidian";
import { getView } from "src/store/effects/save-file/helpers/file-views";
import { t } from "src/lang/text";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	matcher: isAnyOf(
		acu.updateAttribute,
		acu.updateColorQuery,
		acu.updateColor,
		acu.removeColorGroup,
		acu.sortColorGroup
	),
	effect: async (action, api) => {
		const { payload, type } = action;
		const { created } = payload;
		const view = getView(created);
		if (view) {
			let name: keyof GraphSettings, value: GraphSettings[typeof name];
			if (type === acu.updateAttribute.type) {
				name = payload.name;
				value = payload.value;
			} else {
				name = "colorGroups";
				value = (api.getState() as RootState).preset.presets[created]
					.colorGroups;
			}

			const store = api.getState() as RootState;
			if (!store.presets.meta[created].disableAutoApply)
				await obsidian.graph.setSettings({
					settings: {
						[name]: value,
					},
					openGraph: false,
					dto: { created },
				});
			const preset = store.preset.presets[created];
			await view.savePreset(preset, created);
		} else {
			new Notice(t.c.SAVE_ERROR);
		}
	},
});

export const updateAttributeMiddleware = listenerMiddleware.middleware;
