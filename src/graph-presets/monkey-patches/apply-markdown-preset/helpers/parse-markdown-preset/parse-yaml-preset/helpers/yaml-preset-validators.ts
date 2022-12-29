import { FilterOptions, ColorGroupOptions, DisplayOptions, ForceOptions } from "src/types/graph-settings";

const preValidate = (value: string) => {
	return value?.trim();
};

type ValueValidator<T> = (value: string) => {
	value: T | undefined;
	valid: boolean;
};
const isBoolean: ValueValidator<boolean> = (value) => {
	value = preValidate(value);
	if (value === "true" || value === "false")
		return {
			value: value === "true",
			valid: true,
		};
	else
		return {
			value: undefined,
			valid: false,
		};
};

const isString: ValueValidator<string> = (value) => {
	value = preValidate(value);

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
		value = preValidate(value);
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

export const filterOptionsValidators = {
	"collapse-filter": isBoolean,
	search: isString,
	showTags: isBoolean,
	showAttachments: isBoolean,
	hideUnresolved: isBoolean,
	showOrphans: isBoolean,
} satisfies Record<
	keyof FilterOptions,
	ValueValidator<number | boolean | string>
>;

export const colorGroupOptionsValidators = {
	"collapse-color-groups": isBoolean,
} satisfies Record<
	keyof Omit<ColorGroupOptions, "colorGroups">,
	ValueValidator<number | boolean | string>
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
