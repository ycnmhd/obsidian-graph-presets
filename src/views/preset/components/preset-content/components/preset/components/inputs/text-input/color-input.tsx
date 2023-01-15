import { rgbToHex } from "src/views/preset/components/preset-content/components/preset/helpers/map-colors";
import { ac } from "src/store/store";
import { useAppSelector } from "src/store/hooks";
import { ChangeEvent, useCallback, useRef } from "react";

type Props = {
	created: number;
	index: number;
};

export const ColorInput = ({ created, index }: Props) => {
	const timerRef = useRef<ReturnType<typeof setTimeout>>();
	const rgb = useAppSelector(
		(state) => state.preset.presets[created].colorGroups[index].color.rgb
	);
	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			if (timerRef.current) clearTimeout(timerRef.current);
			const hex = e.target.value;
			timerRef.current = setTimeout(() => {
				ac.updateColor({
					created,
					hex,
					index,
				});
			}, 200);
		},
		[index, created]
	);
	return (
		<input
			value={rgbToHex(rgb)}
			onChange={onChange}
			type="color"
			className="absolute right-1"
		/>
	);
};
