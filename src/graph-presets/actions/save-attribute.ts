import { GraphSettings } from "src/types/graph-settings";
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
	state.timeout=setTimeout(() => {
		saveAllUnsavedValues();
	}, 100);
};

const saveAllUnsavedValues = async () => {
	const promises = Object.entries(state.unsavedValues).map(
		async ([created, preset]) => {
			await updateMarkdownPreset({
				dto: { created: +created },
				mode: "partial-from-props",
				props: preset,
			});
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
