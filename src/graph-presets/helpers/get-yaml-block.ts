export const getYamlBlock = (fileData: string) => {
	const lines = fileData.split("\n");
	const yamlStart = lines.findIndex(
		(line) => line === "```yaml:graph-preset"
	);
	const yamlEnd = lines.slice(yamlStart).findIndex((line) => line === "```");
	const yamlLines = lines.slice(yamlStart + 1, yamlStart + yamlEnd);
	return yamlLines.join("\n");
};
