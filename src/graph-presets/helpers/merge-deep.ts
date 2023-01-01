const isObject = (obj: any) => obj && typeof obj === "object";
export const mergeDeep = (target: any, source: any) => {
	const output = { ...target };
	if (isObject(target) && isObject(source)) {
		Object.keys(source).forEach((key) => {
			if (isObject(source[key])) {
				if (!(key in target))
					Object.assign(output, { [key]: source[key] });
				else output[key] = mergeDeep(target[key], source[key]);
			} else if (!(key in target)) {
				Object.assign(output, { [key]: source[key] });
			}
		});
	}
	return output;
};
