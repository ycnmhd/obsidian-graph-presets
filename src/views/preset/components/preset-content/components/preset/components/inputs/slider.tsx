import { graphInputLabels } from "src/lang/graph-input-labels";
import { sliderSettings } from "./shared/slider-settings";
import { useAppSelector } from "src/store/hooks";
import { ac } from "src/store/store";
import { ChangeEvent, FC, useCallback, WheelEvent } from "react";

type Props = {
	name: keyof typeof sliderSettings;
	created: number;
};
export const Slider: FC<Props> = ({ name, created }) => {
	const value = useAppSelector(
		(state) => state.preset.presets[created][name]
	) as number;

	const min = sliderSettings[name].min;
	const step = sliderSettings[name].step;
	const max = sliderSettings[name].max;
	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			ac.updateAttribute({
				value: parseFloat(parseFloat(e.target.value).toFixed(2)),
				name,
				created,
			});
		},
		[created, name]
	);

	const onWheel = useCallback((e: WheelEvent<HTMLInputElement>) => {
		const input = e.target as HTMLInputElement;
		if (e.deltaY > 0) {
			input.stepDown();
		} else {
			input.stepUp();
		}
		onChange(e as unknown as ChangeEvent<HTMLInputElement>);
	}, []);
	return (
		<div className="setting-item mod-slider border-none ">
			<div className="setting-item-info relative">
				<div className="setting-item-name">
					{graphInputLabels[name]}
				</div>
				<div className="setting-item-description"></div>
			</div>
			<div
				className="setting-item-control"
				aria-label={parseFloat(value.toFixed(2)).toString()}
			>
				<input
					onWheel={onWheel}
					className="slider"
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};
