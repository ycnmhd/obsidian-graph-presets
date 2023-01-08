import { useAppSelector } from "src/graph-presets/store/hooks";
import { GraphSettings } from "src/types/graph-settings";
import { UpdateAttribute } from "../../preset-view";
import { ColorGroupsOptionsPreview } from "./components/groups/color-groups-options-preview";
import { DisplayOptionsPreview } from "./components/groups/display-options-preview";
import { FilterOptionsPreview } from "./components/groups/filter-options-preview";
import { ForcesOptionsPreview } from "./components/groups/forces-options-preview";

type Props = {
	ctime: number;
	preset: GraphSettings;
	updateAttribute: UpdateAttribute;
};

export const PresetPreview: React.FC<Props> = ({
	ctime,
	preset,
	updateAttribute,
}) => {
	const meta = useAppSelector((state) => state.presets.meta[ctime]);

	return (
		<div
			className="graph-controls flex flex-col border-none w-[500px] static gap-5 rounded-none"
			style={{
				boxShadow: "none",
				border: "none",
				backgroundColor: "transparent",
			}}
		>
			<FilterOptionsPreview
				options={preset}
				meta={meta}
				updateAttribute={updateAttribute}
			/>
			<ColorGroupsOptionsPreview
				options={preset}
				meta={meta}
				updateAttribute={updateAttribute}
			/>
			<div className="flex flex-wrap gap-5">
				<DisplayOptionsPreview
					options={preset}
					meta={meta}
					updateAttribute={updateAttribute}
				/>
				<ForcesOptionsPreview
					options={preset}
					meta={meta}
					updateAttribute={updateAttribute}
				/>
			</div>
		</div>
	);
};
