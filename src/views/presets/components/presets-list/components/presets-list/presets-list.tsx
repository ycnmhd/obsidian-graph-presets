import { useEffect, useRef, useState } from "react";
import { GraphPresets, MarkdownPresetMeta } from "src/graph-presets";
import { PresetsViewState } from "../../hooks/unsaved-presets";
import { navBarHeight } from "../nav-header/nav-header";
import { searchInputHeight } from "../search-input/search-input";
import { Preset } from "./components/preset/preset";

type Props = {
	presets: MarkdownPresetMeta[];
	unsavedPresets: PresetsViewState["unsavedPresets"];
	deleteUnsavedPreset: (ts: number) => void;
};

export const PresetsList: React.FC<Props> = ({
	presets,
	unsavedPresets,
	deleteUnsavedPreset,
}) => {
	const presetsListRef = useRef<HTMLDivElement>(null);
	const [ready, setReady] = useState(true);
	useEffect(() => {
		setReady(GraphPresets.getInstance().status.ready);
		GraphPresets.getInstance().status.onReady(() => setReady(true));
	}, []);
	return (
		<div
			style={{
				height: `calc(100% - ${
					navBarHeight + searchInputHeight + 10
				}px)`,

				overflowY: "scroll",
				scrollbarGutter: "stable both-edges",
			}}
			className={!ready ? "is-loading" : ""}
			ref={presetsListRef}
		>
			{unsavedPresets.map((preset) => (
				<Preset
					meta={preset}
					key={preset.created}
					deleteUnsavedPreset={() =>
						deleteUnsavedPreset(preset.created)
					}
				/>
			))}
			{presets.map((preset) => (
				<Preset meta={preset} key={preset.created} />
			))}
		</div>
	);
};
