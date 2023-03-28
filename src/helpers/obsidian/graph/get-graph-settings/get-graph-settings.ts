import { graphSettingsGroup } from "src/types/apply-preset";
import { getGraphSettingsFromView } from "./get-graph-settings-from-view";
import { GraphSettings } from "src/types/graph-settings";
import { getSavedGraphSettings } from "src/helpers/obsidian/graph/get-graph-settings/get-saved-graph-settings";
import { getGraphLeaf } from "../helpers/get-graph-leaf/get-graph-leaf";
import { GetPresetDTO } from "src/helpers/get-preset";

type Props = {
	group?: graphSettingsGroup;
	dto: GetPresetDTO;
};

export const getGraphSettings = async ({ group, dto }: Props) => {
	let settings: GraphSettings | Partial<GraphSettings>;
	const leaf = await getGraphLeaf(dto);
	if (leaf) {
		settings = getGraphSettingsFromView({ leaf, group });
	} else {
		settings = await getSavedGraphSettings(group);
	}
	return settings;
};
