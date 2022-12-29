import { TFile } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";
import { obsidian } from "src/obsidian/obsidian";
import { parseMarkDownPreset } from "./parse-markdown-preset/parse-markdown-preset";

type Props = {
	file: TFile;
};

export const parseAndApplyMarkdownPreset = async ({ file }: Props) => {
	const data = await obsidian.fs.readFile({ file });
	const preset = parseMarkDownPreset(data);
	await actions.applyMarkdownPreset(preset);
};
