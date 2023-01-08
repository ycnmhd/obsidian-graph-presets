import { GraphSettings } from "src/types/graph-settings";
import { useInputState } from "./hooks/input-state";
import { graphInputLabels } from "../../../../../../lang/graph-input-labels";
import { UnsavedChangesIndicator } from "./shared/unsaved-changes-indicator";

type Props = {
	name: keyof GraphSettings;
	min: number;
	max: number;
	value: number;
	onChange: (name: keyof GraphSettings, value: number) => void;
};
export const Slider: React.FC<Props> = ({
	name,
	value,
	min,
	max,
	onChange,
}) => {
	const { inputRef, unsavedChanges } = useInputState({
		onChangeDebounced: (value: string) => onChange(name, parseFloat(value)),
		value: value,
	});
	return (
		<div className="setting-item mod-slider border-none ">
			<div className="setting-item-info relative">
				<UnsavedChangesIndicator
					show={unsavedChanges}
					className="top-[28px]"
				/>
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
