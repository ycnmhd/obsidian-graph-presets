import { useEffect, useState, useSyncExternalStore } from "react";
import { actions } from "src/graph-presets/actions/actions";
import {
	GraphPresets,
} from "src/graph-presets/graph-presets";
import { logger } from "src/graph-presets/helpers/logger";
import { GraphSettings } from "src/types/graph-settings";
import { ColorGroupsOptionsPreview } from "./components/groups/color-groups-options-preview";
import { DisplayOptionsPreview } from "./components/groups/display-options-preview";
import { FilterOptionsPreview } from "./components/groups/filter-options-preview";
import { ForcesOptionsPreview } from "./components/groups/forces-options-preview";

type Props = {
	ctime: number;
};

export const PresetPreview: React.FC<Props> = ({ ctime }) => {
	const plugin = GraphPresets.getInstance();
	const [preset, setPreset] = useState<GraphSettings>();
	const [error, setError] = useState(false);
	const store = useSyncExternalStore(
		plugin.store.subscribe,
		plugin.store.getSnapshot
	);
	const meta = plugin.store.getSnapshot().state.meta[ctime];

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
	}, [store.state.meta]);
	if (error)
		return (
			<div style={{ padding: 10, backgroundColor: "#ff000010" }}>
				Error parsing preset
			</div>
		);
	if (!preset) return null;
	return (
		<div
			className="graph-controls flex flex-col border-none w-[230px] static "
			style={{
				justifyContent: "center",
				boxShadow: "none",
			}}
		>
			<FilterOptionsPreview options={preset} meta={meta} />
			<ColorGroupsOptionsPreview options={preset} meta={meta} />
			<DisplayOptionsPreview options={preset} meta={meta} />
			<ForcesOptionsPreview options={preset} meta={meta} />
		</div>
	);
};
