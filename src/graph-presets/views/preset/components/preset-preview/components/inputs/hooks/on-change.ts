import { useCallback } from "react";
import { actions } from "src/graph-presets/actions/actions";
import { GraphSettings } from "src/types/graph-settings";

export const useOnChange = <k extends keyof GraphSettings>(
	created: number,
	name: k
) => {
	return useCallback((value: GraphSettings[k]) => {
		actions.saveAttribute<typeof name>(
			{ created },
			{
				name,
				value,
			}
		);
	}, []);
};
