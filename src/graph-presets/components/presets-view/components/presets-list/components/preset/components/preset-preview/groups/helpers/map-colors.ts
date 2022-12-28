export const rgbToHex = (rgb: number) => {
	const hex = rgb.toString(16);
	return `#${hex.padStart(6, "0")}`;
};

// #99b7b8 -> 10074040
export const hexToRgb = (hex: string) => {
	const value = /#([0-9a-f]{6}|[0-9a-f]{3})/i.exec(hex)?.[1];
	if (!value) return 0

	const rgb = parseInt(
		value.length === 3
			? value
					.split("")
					.map((c) => c + c)
					.join("")
			: value,
		16
	);
	return rgb;
};
