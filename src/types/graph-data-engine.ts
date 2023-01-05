/* eslint-disable no-mixed-spaces-and-tabs */
import {
	ColorGroupOptions,
	DisplayOptions,
	FilterOptions,
	ForceOptions,
	GraphSettings,
} from "./graph-settings";

type OptionListener<T = number | boolean | string> = (value: T) => T;
type SetOptions = (settings: Partial<GraphSettings>) => void;
export type GraphDataEngine = {
	filterOptions: {
		optionListeners: {
			[key in keyof FilterOptions]: OptionListener;
		};
		setOptions: SetOptions;
	};

	colorGroupOptions: {
		optionListeners: {
			[key in keyof ColorGroupOptions]: OptionListener;
		};
		setOptions: SetOptions;
	};
	displayOptions: {
		optionListeners: {
			[key in keyof DisplayOptions]: OptionListener;
		};
		setOptions: SetOptions;
	};
	forceOptions: {
		optionListeners: {
			[key in keyof ForceOptions]: OptionListener;
		};
		setOptions: SetOptions;
	};
	getOptions: () => GraphSettings;
	setOptions: (settings: GraphSettings) => void;
	render: () => void;
};
