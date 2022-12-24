import { MouseEvent } from "react";
import { svgs } from "src/assets/svgs";
import { actions } from "src/graph-presets/actions/actions";
import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";

type Props = {
	presetName: string;
	group: graphSettingsGroup;
};
export const GroupContainerMenu: React.FC<Props> = ({ group, presetName }) => {
	const apply = (e: MouseEvent) => {
		e.stopPropagation();
		actions.applyPreset(presetName, group);
	};
	const update = (e: MouseEvent) => {
		e.stopPropagation();
		actions.updatePreset(presetName, group);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				gap: "5px",
				width: "100%",
				position: "absolute",
				bottom: "0",
				left: "0",
				height: "50px",
				backdropFilter: "blur(5px)",
			}}
		>
			<button
				className="mod-cta"
				style={{ width: "70px" }}
				onClick={apply}
				aria-label={`Apply ${group}`}
			>
				{svgs["document-check"]}
			</button>
			<button
				className="mod-cta"
				style={{ width: "70px" }}
				onClick={update}
				aria-label={`Update ${group}`}
			>
				{svgs["pencil"]}
			</button>
		</div>
	);
};
