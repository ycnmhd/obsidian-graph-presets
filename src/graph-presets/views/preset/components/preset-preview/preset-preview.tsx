import { useEffect, useState } from "react";
import { actions } from "src/graph-presets/actions/actions";
import { logger } from "src/graph-presets/helpers/logger";
import { useAppSelector } from "src/graph-presets/store/hooks";
import { GraphSettings } from "src/types/graph-settings";
import { ColorGroupsOptionsPreview } from "./components/groups/color-groups-options-preview";
import { DisplayOptionsPreview } from "./components/groups/display-options-preview";
import { FilterOptionsPreview } from "./components/groups/filter-options-preview";
import { ForcesOptionsPreview } from "./components/groups/forces-options-preview";

type Props = {
	ctime: number;
};

export const PresetPreview: React.FC<Props> = ({ ctime }) => {
	const [preset, setPreset] = useState<GraphSettings>();
	const [error, setError] = useState(false);

	const meta = useAppSelector((state) => state.presets.meta[ctime]);

	useEffect(() => {
		const loadPreset = async () => {
			try {
				const preset = await actions.getPreset({ created: ctime });
				setPreset(preset as GraphSettings);
			} catch (e) {
				setError(true);
				logger.error(e);
			}
		};
		loadPreset();
	}, [meta]);
	if (error)
		return (
			<div style={{ padding: 10, backgroundColor: "#ff000010" }}>
				Error parsing preset
			</div>
		);
	if (!preset) return null;
	return (
		<div
			className="graph-controls flex flex-col border-none w-[500px] static gap-5 rounded-none"
			style={{
				boxShadow: "none",
				border: "none",
				backgroundColor: "transparent",
			}}
		>
			<FilterOptionsPreview options={preset} meta={meta} />
			<ColorGroupsOptionsPreview options={preset} meta={meta} />
			<div className="flex flex-wrap gap-5">
				<DisplayOptionsPreview options={preset} meta={meta} />
				<ForcesOptionsPreview options={preset} meta={meta} />
			</div>
		</div>
	);
};
