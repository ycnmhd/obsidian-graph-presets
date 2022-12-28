import { GraphSettings } from "src/types/graph-settings";
import { logger } from "src/graph-presets/helpers/logger";
import { yamlPresetValidators } from "./helpers/yaml-preset-validators";

export const parseYamlPreset = (file: string) => {
	const lines = file.split("\n");

	const yamlStart = lines.findIndex(
		(line) => line === "```yaml:graph-preset"
	);
	const yamlEnd = lines.slice(yamlStart).findIndex((line) => line === "```");
	const yamlLines = lines.slice(yamlStart + 1, yamlStart + yamlEnd);

	const settings: Partial<GraphSettings> = {};
	for (const line of yamlLines) {
		const [key, value] = line.split(":") as [
			keyof typeof yamlPresetValidators,
			string
		];

		if (yamlPresetValidators[key]) {
			const payload = yamlPresetValidators[key](value);
			if (payload.valid) {
				settings[key] = payload.value as any;
			}
		} else {
			logger.log("Invalid key", key);
		}
	}

	return settings;
};
