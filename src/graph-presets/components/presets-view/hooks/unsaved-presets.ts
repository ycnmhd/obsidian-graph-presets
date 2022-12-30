import { useReducer } from "react";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";

export type PresetsViewState = {
	unsavedPresets: Omit<MarkdownPresetMeta, "file">[];
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
					{
						created: ts,
						updated: ts,
						applied: 0,
						name: "",
						path: "",
					},
					...state.unsavedPresets,
				],
			};
		}
		case "deletePreset": {
			if (!action.payload) return state;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars

			return {
				...state,
				unsavedPresets: state.unsavedPresets.filter(
					(preset) => preset.created !== action.payload
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

	const deletePreset = (createdTs: number) => {
		dispatch({ type: "deletePreset", payload: createdTs });
	};

	return {
		unsavedPresets: state.unsavedPresets,
		createPreset,
		deletePreset,
	};
};
