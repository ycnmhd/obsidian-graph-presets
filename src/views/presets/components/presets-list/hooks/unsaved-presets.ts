import { useReducer } from "react";
import { MarkdownPresetMeta } from "src/graph-presets";

export type PresetsViewState = {
	unsavedPresets: Omit<MarkdownPresetMeta, "file">[];
};

type Action =
	| {
			type: "deletePreset";
			payload: { id: number };
	  }
	| {
			type: "createPreset";
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
						applied: 0,
						target: "global",
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
					(preset) => preset.created !== action.payload.id
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
		dispatch({ type: "deletePreset", payload: { id: createdTs } });
	};

	return {
		unsavedPresets: state.unsavedPresets,
		createPreset,
		deletePreset,
	};
};
