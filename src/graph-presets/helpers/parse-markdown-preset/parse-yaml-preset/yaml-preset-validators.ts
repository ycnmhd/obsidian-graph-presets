import {
	FilterOptions,
	ColorGroupOptions,
	DisplayOptions,
	ForceOptions,
	ColorGroup,
} from "src/types/graph-settings";

export type ValueValidator<T> = (value: T) => {
	value: T | undefined;
	valid: boolean;
};
const isBoolean: ValueValidator<boolean> = (value) => {
	if (typeof value === "boolean")
		return {
			value,
			valid: true,
		};
	else
		return {
			value: undefined,
			valid: false,
		};
};

const isString: ValueValidator<string> = (value) => {
	value = value.trim();

	if (typeof value === "string")
		return {
			value,
			valid: true,
		};
	else
		return {
			value: undefined,
			valid: false,
		};
};
const isInRange: (min: number, max: number) => ValueValidator<number> =
	(min, max) => (value) => {
		const num = Number(value);
		if (!isNaN(num) && num >= min && num <= max) {
			return {
				value: num,
				valid: true,
			};
		} else
			return {
				value: undefined,
				valid: false,
			};
	};

const isColorGroup: ValueValidator<ColorGroup> = (value) => {
	let valid = true;
	if (!isString(value.query)) valid = false;
	if (!isInRange(0, 16777215)(value.color.rgb)) valid = false;
	if (!isInRange(0, 1)(value.color.a)) valid = false;
	return {
		valid,
		value: valid ? value : undefined,
	};
};

const isArrayOf =
	<T>(validator: ValueValidator<T>) =>
	(value: T[]) => {
		let valid = true;
		if (!Array.isArray(value)) valid = false;
		if (!value.every(validator)) valid = false;
		return {
			valid,
			value: valid ? value : undefined,
		};
	};

export const filterOptionsValidators = {
	"collapse-filter": isBoolean,
	search: isString,
	showTags: isBoolean,
	showAttachments: isBoolean,
	hideUnresolved: isBoolean,
	showOrphans: isBoolean,
	localBacklinks: isBoolean,
	localForelinks: isBoolean,
	localInterlinks: isBoolean,
	localJumps: isInRange(1, 5),
} satisfies Record<
	keyof FilterOptions,
	ValueValidator<number | boolean | string>
>;

export const colorGroupOptionsValidators = {
	"collapse-color-groups": isBoolean,
	colorGroups: isArrayOf(isColorGroup),
} satisfies Record<
	keyof ColorGroupOptions,
	ValueValidator<number | boolean | string | ColorGroup[]>
>;

export const displayOptionsValidators = {
	"collapse-display": isBoolean,
	showArrow: isBoolean,
	textFadeMultiplier: isInRange(-3, 3),
	nodeSizeMultiplier: isInRange(0.1, 5),
	lineSizeMultiplier: isInRange(0.1, 5),
} satisfies Record<
	keyof DisplayOptions,
	ValueValidator<number | boolean | string>
>;
export const forceOptionsValidators = {
	"collapse-forces": isBoolean,
	centerStrength: isInRange(0, 1),
	repelStrength: isInRange(0, 20),
	linkStrength: isInRange(0, 1),
	linkDistance: isInRange(30, 500),
} satisfies Record<
	keyof ForceOptions,
	ValueValidator<number | boolean | string>
>;

const additionalOptionsValidators = {
	scale: isInRange(0, 8),
	close: isBoolean,
} satisfies Record<string, ValueValidator<number | boolean>>;

export const yamlPresetValidators = {
	...filterOptionsValidators,
	...colorGroupOptionsValidators,
	...displayOptionsValidators,
	...forceOptionsValidators,
	...additionalOptionsValidators,
};
