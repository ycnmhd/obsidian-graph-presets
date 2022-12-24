export const mapValueToRGB = (value: number) => {
	const hex = value.toString(16);
	return `#${hex.padStart(6, "0")}`;
};
