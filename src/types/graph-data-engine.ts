type OptionListener<T = any> = (value: T) => void;
export type GraphDataEngine = {
	filterOptions: {
		optionListeners: {
			"collapse-filter": OptionListener;
			hideUnresolved: OptionListener;
			search: OptionListener;
			showAttachments: OptionListener;
			showOrphans: OptionListener;
			showTags: OptionListener;
		};
	};
	colorGroupOptions: {
		optionListeners: {
			"collapse-color-groups": OptionListener;
			colorGroups: OptionListener;
		};
	};
	displayOptions: {
		optionListeners: {
			"collapse-display": OptionListener;
			lineSizeMultiplier: OptionListener;
			nodeSizeMultiplier: OptionListener;
			showArrow: OptionListener;
			textFadeMultiplier: OptionListener;
		};
	};
	forceOptions: {
		optionListeners: {
			"collapse-forces": OptionListener;
			centerStrength: OptionListener;
			linkDistance: OptionListener;
			linkStrength: OptionListener;
			repelStrength: OptionListener;
		};
	};
};
