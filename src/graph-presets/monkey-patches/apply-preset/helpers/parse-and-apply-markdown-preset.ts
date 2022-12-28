import { MarkdownView } from "obsidian";
import { actions } from "src/graph-presets/actions/actions";
import { parseMarkDownPreset } from "./parse-markdown-preset/parse-markdown-preset";

type Props = {
	view: MarkdownView;
};
export const parseAndApplyMarkdownPreset = async ({ view }: Props) => {
	const data = view.getViewData();
	const preset = parseMarkDownPreset(data);
	await actions.applyMarkdownPreset(preset);
};
