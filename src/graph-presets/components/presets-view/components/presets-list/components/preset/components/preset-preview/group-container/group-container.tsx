import { useState } from "react";
import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";
import { GroupContainerMenu } from "./components/group-container-menu";
import { sharedPreviewStyles } from "./shared-props";

type Props = {
	presetName: string;
	group: graphSettingsGroup;
	className?: string;
	children?: React.ReactNode;
};

export const GroupContainer: React.FC<Props> = ({
	group,
	presetName,
	children,
	className = "",
}) => {
	const [showButtons, setShowButtons] = useState(false);
	return (
		<div
			style={{ ...sharedPreviewStyles, position: "relative" }}
			className={"tree-item graph-control-section " + className}
			onMouseEnter={() => setShowButtons(true)}
			onMouseLeave={() => setShowButtons(false)}
			onClick={() => setShowButtons(false)}
		>
			{children}
			{showButtons && (
				<GroupContainerMenu group={group} presetName={presetName} />
			)}
		</div>
	);
};
