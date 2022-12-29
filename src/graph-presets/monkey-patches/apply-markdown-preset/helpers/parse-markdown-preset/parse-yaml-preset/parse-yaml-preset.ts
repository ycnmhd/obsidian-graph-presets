import { GraphSettings } from "src/types/graph-settings";
import { logger } from "src/graph-presets/helpers/logger";
import {
	ValueValidator,
	yamlPresetValidators,
} from "./helpers/yaml-preset-validators";
import { getYamlBlock } from "src/graph-presets/helpers/get-yaml-block";
import { parseYaml } from "obsidian";

type Key = keyof typeof yamlPresetValidators;
export const parseYamlPreset = (file: string) => {
	const config = parseYaml(getYamlBlock(file)) as Partial<GraphSettings>;
	const settings: Partial<GraphSettings> = {};
	for (const [key, value] of Object.entries(config)) {
		if (key in yamlPresetValidators) {
			const validator = yamlPresetValidators[
				key as Key
			] as ValueValidator<typeof value>;
			const payload = validator(value);
			if (payload.valid) {
				settings[key as keyof GraphSettings] = payload.value as any;
			}
		} else {
			logger.log("Invalid key", key);
		}
	}

	return settings;
};
