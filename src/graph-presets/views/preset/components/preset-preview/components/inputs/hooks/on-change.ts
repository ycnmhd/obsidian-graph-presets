import { useCallback } from "react";
import { ac } from "src/graph-presets/store/store";
import { GraphSettings } from "src/types/graph-settings";

export const useOnChange = <k extends keyof GraphSettings>(
	created: number,
	name: k
) => {
	return useCallback((value: GraphSettings[k]) => {
		ac.updateAttribute({ created, name, value });
	}, []);
};
