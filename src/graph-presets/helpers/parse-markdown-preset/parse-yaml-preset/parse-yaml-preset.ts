import { GraphSettings } from "src/types/graph-settings";
import { logger } from "src/graph-presets/helpers/logger";
import { yamlPresetValidators, ValueValidator } from "./yaml-preset-validators";
import { getYamlBlock } from "src/graph-presets/helpers/get-yaml-block";
import { yaml } from "src/graph-presets/helpers/yaml";

type Key = keyof typeof yamlPresetValidators;
export const parseYamlPreset = (file: string) => {
	const config = yaml.parse(getYamlBlock(file)) as Partial<GraphSettings>;
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
			logger.error("Invalid key", key);
		}
	}

	return settings;
};
