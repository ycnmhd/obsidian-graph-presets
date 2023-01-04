/* eslint-disable no-mixed-spaces-and-tabs */
import {
	ColorGroupOptions,
	DisplayOptions,
	FilterOptions,
	ForceOptions,
} from "./graph-settings";

type OptionListener<T = number | boolean | string> = (value: T) => T;

export type GraphDataEngine = {
	filterOptions: {
		optionListeners: {
			[key in keyof FilterOptions]: OptionListener;
		};
	};

	colorGroupOptions: {
		optionListeners: {
			[key in keyof ColorGroupOptions]: OptionListener;
		};
	};
	displayOptions: {
		optionListeners: {
			[key in keyof DisplayOptions]: OptionListener;
		};
	};
	forceOptions: {
		optionListeners: {
			[key in keyof ForceOptions]: OptionListener;
		};
	};
};
