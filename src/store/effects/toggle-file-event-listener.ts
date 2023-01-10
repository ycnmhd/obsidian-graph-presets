import { acu } from "../ac";
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { GraphPresets } from "../../graph-presets";
import { GraphPresetsItemViewType } from "../../views/presets/presets-view";
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	matcher: isAnyOf(acu.loadSettings, acu.setSortBy, acu.presetsView),
	effect: async (action, api) => {
		const state = api.getState() as RootState;
		const { sortBy } = state.preferences;
		const presetsLeafIsEnabled =
			app.workspace.getLeavesOfType(GraphPresetsItemViewType).length > 0;
		const isSortByModification =
			sortBy === "dateModifiedAsc" || sortBy === "dateModifiedDesc";

		const plugin = GraphPresets.getInstance();
		plugin.toggleFileEventListener(
			"modify",
			presetsLeafIsEnabled && isSortByModification
		);
		plugin.toggleFileEventListener("delete", presetsLeafIsEnabled);
		plugin.toggleFileEventListener("rename", presetsLeafIsEnabled);
	},
});

export const toggleFileEventListener = listenerMiddleware.middleware;
