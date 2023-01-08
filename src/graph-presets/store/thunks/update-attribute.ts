import { createAsyncThunk } from "@reduxjs/toolkit";
import { obsidian } from "src/obsidian/obsidian";
import { GraphSettings } from "src/types/graph-settings";
import { getSnapshot } from "../store";
import { GetPresetDTO } from "../../actions/get-preset";
import { updateMarkdownPreset } from "../../actions/save-preset-to-markdown/update-markdown-preset";

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
	const presetsMeta = getSnapshot().presets.meta;
	const promises = Object.entries(state.unsavedValues).map(
		async ([created, preset]) => {
			const p = presetsMeta[+created];
			await updateMarkdownPreset({
				dto: { created: +created },
				mode: "partial-from-props",
				props: preset,
			});
			if (!p?.disableAutoApply) {
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

export type UpdateAttributeDTO<k extends keyof GraphSettings> = GetPresetDTO & {
	name: k;
	value: GraphSettings[k];
};

export const updateAttributeThunk = createAsyncThunk(
	"root/updateAttribute",
	<k extends keyof GraphSettings>(dto: UpdateAttributeDTO<k>) => {
		addUnsavedValue({ dto, name: dto.name, value: dto.value });
	}
);
