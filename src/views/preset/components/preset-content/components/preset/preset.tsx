import { ColorGroupsOptionsPreview } from "./components/groups/color-groups-options-preview";
import { FilterOptionsPreview } from "./components/groups/filter-options-preview";
import { useAppSelector } from "src/store/hooks";
import { DisplayOptionsPreview } from "./components/groups/display-options-preview";
import { ForcesOptionsPreview } from "./components/groups/forces-options-preview";
import { FC } from "react";

type Props = {
	created: number;
};
export const Preset: FC<Props> = ({ created }) => {
	const hasPreset = useAppSelector(
		(state) => state.preset.presets[created] !== undefined
	);

	if (!hasPreset) return null;

	return (
		<div
			className="graph-controls flex flex-col border-none w-[500px] static gap-5 rounded-none is-loading"
			style={{
				boxShadow: "none",
				border: "none",
				backgroundColor: "transparent",
			}}
		>
			<FilterOptionsPreview created={created} />
			<ColorGroupsOptionsPreview created={created} />
			<div className="flex flex-wrap gap-5">
				<DisplayOptionsPreview created={created} />
				<ForcesOptionsPreview created={created} />
			</div>
		</div>
	);
};
