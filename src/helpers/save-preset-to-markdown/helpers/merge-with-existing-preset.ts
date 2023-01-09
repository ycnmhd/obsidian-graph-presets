import { GraphSettings } from "src/types/graph-settings";
import { getPreset, GetPresetDTO } from "../../get-preset";

/** To avoid loosing local-graph-specific settings when saving a global graph*/
export const mergeWithExistingPreset = async (
	preset: GraphSettings,
	dto: GetPresetDTO
): Promise<GraphSettings> => {
	const existingPreset = await getPreset(dto);
	return {
		...existingPreset,
		...preset,
	} as GraphSettings;
};
