import { obsidian } from "src/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { GraphPresets } from "../graph-presets";
import { GetPresetDTO } from "./get-preset";
import { updateMarkdownPreset } from "./save-preset-to-markdown/update-markdown-preset";

type State = {
	unsavedValues: Record<number, Partial<GraphSettings>>;
	timeout: ReturnType<typeof setTimeout> | null;
};

const state: State = {
	unsavedValues: {},
	timeout: null,
};

type Props<k extends keyof GraphSettings> = {
	dto: GetPresetDTO;
	name: k;
	value: GraphSettings[k];
};

const addUnsavedValue = <k extends keyof GraphSettings>({
	dto,
	name,
	value,
}: Props<k>) => {
	if (state.timeout) clearTimeout(state.timeout);
	if (!state.unsavedValues[dto.created])
		state.unsavedValues[dto.created] = {};
	state.unsavedValues[dto.created][name] = value;
	state.timeout = setTimeout(() => {
		saveAllUnsavedValues();
	}, 10);
};

const saveAllUnsavedValues = async () => {
	const plugin = GraphPresets.getInstance();
	const presetsMeta = plugin.store.getSnapshot().settings.data.presetsMeta;
	const promises = Object.entries(state.unsavedValues).map(
		async ([created, preset]) => {
			const p = presetsMeta[+created];
			await updateMarkdownPreset({
				dto: { created: +created },
				mode: "partial-from-props",
				props: preset,
			});
			if (!p?.meta?.disableAutoApply) {
				obsidian.graph.setSettings({
					settings: preset,
					openGraph: false,
					dto: { created: +created },
				});
			}

			delete state.unsavedValues[+created];
		}
	);
	await Promise.all(promises);
};

export const saveAttribute = async <k extends keyof GraphSettings>(
	dto: GetPresetDTO,
	{ name, value }: { name: k; value: GraphSettings[k] }
) => {
	addUnsavedValue({ dto, name, value });
};
