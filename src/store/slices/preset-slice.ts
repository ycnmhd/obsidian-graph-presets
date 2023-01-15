import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetPresetDTO } from "src/helpers/get-preset";
import { GraphSettings } from "src/types/graph-settings";
import { hexToRgb } from "src/views/preset/components/preset-content/components/preset/helpers/map-colors";

type Attribute<k extends keyof GraphSettings> = {
	name: k;
	value: GraphSettings[k];
	created: number;
};

type PresetsSlice = {
	presets: Record<number, GraphSettings>;
};

const initialState: PresetsSlice = {
	presets: {},
};

export const presetSlice = createSlice({
	name: "preset",
	initialState,
	reducers: {
		setPreset: (
			state,
			{
				payload,
			}: PayloadAction<GetPresetDTO & { preset: GraphSettings | null }>
		) => {
			if (payload.preset) state.presets[payload.created] = payload.preset;
			else delete state.presets[payload.created];
		},
		updateAttribute: (
			state,
			{ payload }: PayloadAction<Attribute<keyof GraphSettings>>
		) => {
			const { value, created, name } = payload;
			// @ts-ignore
			state.presets[created][name] = value;
		},
		updateColor: (
			state,
			{
				payload,
			}: PayloadAction<{ created: number; index: number; hex: string }>
		) => {
			const { created, index, hex } = payload;
			state.presets[created].colorGroups[index].color.rgb = hexToRgb(hex);
		},
		updateColorQuery: (
			state,
			{
				payload,
			}: PayloadAction<{ created: number; index: number; query: string }>
		) => {
			const { created, index, query } = payload;
			state.presets[created].colorGroups[index].query = query;
		},
		removeColorGroup: (
			state,
			{ payload }: PayloadAction<{ created: number; index: number }>
		) => {
			const { created, index } = payload;
			state.presets[created].colorGroups.splice(index, 1);
		},
		addColorGroup: (
			state,
			{ payload }: PayloadAction<{ created: number }>
		) => {
			const { created } = payload;
			state.presets[created].colorGroups.push({
				query: "",
				color: {
					rgb: 0,
					a: 1,
				},
			});
		},
		sortColorGroup: (
			state,
			{
				payload,
			}: PayloadAction<{
				created: number;
				oldIndex: number;
				newIndex: number;
			}>
		) => {
			const { created, oldIndex, newIndex } = payload;
			const groups = state.presets[created].colorGroups;
			groups.splice(newIndex, 0, groups.splice(oldIndex, 1)[0]);
		},
	},
});
