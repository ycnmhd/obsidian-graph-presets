import { TFile } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";

type Props = {
	file: TFile;
};

export const parseAndApplyMarkdownPreset = async ({ file }: Props) => {
	await actions.applyMarkdownPreset(
		await actions.getPreset({ created: file.stat.ctime })
	);
};
