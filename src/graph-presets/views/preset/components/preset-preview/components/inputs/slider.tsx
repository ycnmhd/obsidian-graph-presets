import { useInputState } from "./hooks/input-state";

type Props = {
	name: string;
	min: number;
	max: number;
	value: number;
	onChange: (value: number) => void;
};
export const Slider: React.FC<Props> = ({
	name,
	value,
	min,
	max,
	onChange,
}) => {
	const { inputRef } = useInputState({
		onChangeDebounced: (value: string) => onChange(parseFloat(value)),
		value: value,
	});
	return (
		<div className="setting-item mod-slider border-none">
			<div className="setting-item-info">
				<div className="setting-item-name">{name}</div>
				<div className="setting-item-description"></div>
			</div>
			<div
				className="setting-item-control"
				aria-label={
									parseFloat(value.toFixed(2)).toString()
				}
			>
				<input
					ref={inputRef}
					className="slider"
					type="range"
					min={min}
					max={max}
					step="any"
				/>
			</div>
		</div>
	);
};
