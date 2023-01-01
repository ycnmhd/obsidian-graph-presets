import { useEffect, useRef } from "react";

type Props = {
	name: string;
	min: number;
	max: number;
	value: number;
	
};
export const Slider: React.FC<Props> = ({
	name,
	value,
	min,
	max,
	
}) => {	
	const ref = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (ref.current) ref.current.value = value+"";
	}, [value]);
	return (
		<div className="setting-item mod-slider border-none">
			<div className="setting-item-info">
				<div className="setting-item-name">{name}</div>
				<div className="setting-item-description"></div>
			</div>
			<div className="setting-item-control" aria-label={""+value}>
				<input
					ref={ref}
					className="slider"
					type="range"
					min={min}
					max={max}
					step="any"
					disabled={true}					
				/>
			</div>
		</div>
	);
};
