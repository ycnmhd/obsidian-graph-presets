import { useReducer } from "react";
import { Preset } from "src/graph-presets/settings/default-settings";

type PresetsViewState = {
	unsavedPresets: Preset[];
};

type ActionName = "createPreset" | "deletePreset";

type Action = {
	type: ActionName;
	payload?: number;
};

const reducer = (state: PresetsViewState, action: Action): PresetsViewState => {
	switch (action.type) {
		case "createPreset": {
			const ts = Date.now();
			return {
				...state,
				unsavedPresets: [
					...state.unsavedPresets,
					{
						meta: {
							created: ts,
							updated: ts,
						},
						settings: null as any,
					},
				],
			};
		}
		case "deletePreset": {
			if (!action.payload) return state;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars

			return {
				...state,
				unsavedPresets: state.unsavedPresets.filter(
					(preset) => preset.meta.created !== action.payload
				),
			};
		}
	}
};

export const useUnsavedPresets = () => {
	const [state, dispatch] = useReducer(reducer, {
		unsavedPresets: [],
	} as PresetsViewState);

	const createPreset = () => {
		dispatch({ type: "createPreset" });
	};

	const deletePreset = (ts: number) => {
		dispatch({ type: "deletePreset", payload: ts });
	};

	return {
		unsavedPresets: state.unsavedPresets,
		createPreset,
		deletePreset,
	};
};
