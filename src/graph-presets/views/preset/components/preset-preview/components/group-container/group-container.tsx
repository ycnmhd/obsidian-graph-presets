import classnames from "classnames";
import { useEffect, useState } from "react";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { GroupHeader } from "./group-header";
import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";
import { actions } from "src/graph-presets/actions/actions";
import { GraphSettings } from "src/types/graph-settings";
import AnimateHeight from "react-animate-height";

const collapsedStateKeys: Record<graphSettingsGroup, keyof GraphSettings> = {
	filters: "collapse-filter",
	groups: "collapse-color-groups",
	display: "collapse-display",
	forces: "collapse-forces",
};

type Props = {
	meta: MarkdownPresetMeta;
	group: graphSettingsGroup;
	children?: React.ReactNode;
	collapsed: boolean;
};

export const GroupContainer: React.FC<Props> = ({
	group,
	meta,
	children,
	collapsed,
}) => {
	const [localCollapsed, setLocalCollapsed] = useState(collapsed);
	useEffect(() => {
		if (localCollapsed !== collapsed)
			actions.saveAttribute(meta, {
				name: collapsedStateKeys[group],
				value: localCollapsed,
			});
	}, [localCollapsed]);
	useEffect(() => {
		if (localCollapsed !== collapsed) setLocalCollapsed(collapsed);
	}, [collapsed]);

	return (
		<div
			className={classnames(
				"tree-item graph-control-section ",
				localCollapsed ? "is-collapsed" : "",
				"border-none rounded-md shadow-md ",
				"py-3 px-6",
				"group"
			)}
			style={{
				backgroundColor: "var(--background-primary)",
				flex: 1,
				minWidth: 150,
				height: localCollapsed ? "fit-content" : "auto",
			}}
		>
			<GroupHeader
				meta={meta}
				group={group}
				setCollapsed={setLocalCollapsed}
			/>

			<AnimateHeight
				id={group}
				duration={200}
				height={!localCollapsed ? "auto" : 0} 
			>
				<div className="tree-item-children mt-3">{children}</div>
			</AnimateHeight>
		</div>
	);
};
