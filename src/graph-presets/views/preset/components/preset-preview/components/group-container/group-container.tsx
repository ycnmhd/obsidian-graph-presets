import classnames from "classnames";
import { useState } from "react";
import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { GroupHeader } from "./group-header";

type Props = {
	meta: MarkdownPresetMeta;
	group: graphSettingsGroup;
	children?: React.ReactNode;
};

export const GroupContainer: React.FC<Props> = ({ group, meta, children }) => {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<div
			className={classnames(
				"tree-item graph-control-section ",
				collapsed ? "is-collapsed" : "",
				"border-none rounded-md shadow-md ",
				"py-3 px-6"
			)}
			style={{
				backgroundColor: "var(--background-primary)",
				flex: 1,
				minWidth: collapsed ? "100%" : 150,
			}}
		>
			<GroupHeader
				meta={meta}
				group={group}
				setCollapsed={setCollapsed}
			/>
			{!collapsed && <div className="tree-item-children mt-3">{children}</div>}
		</div>
	);
};
