type Props = {
	name: string;
	min: number;
	max: number;
	value: number;
    step?: number;
};
export const Slider: React.FC<Props> = ({ name, value, min, max, step=1 }) => {
	return (
		<div className="setting-item mod-slider border-none">
			<div className="setting-item-info">
				<div className="setting-item-name">{name}</div>
				<div className="setting-item-description"></div>
			</div>
			<div className="setting-item-control">
				<input
					className="slider"
					type="range"
					min={min}
					max={max}
					step={step}
					defaultValue={value}
					disabled={true}
				/>
			</div>
		</div>
	);
};
