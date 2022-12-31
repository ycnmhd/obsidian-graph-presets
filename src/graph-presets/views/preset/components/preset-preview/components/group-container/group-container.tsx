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
				collapsed ? "is-collapsed" : ""
			)}
		>
			<GroupHeader
				meta={meta}
				group={group}
				setCollapsed={setCollapsed}
			/>
			{!collapsed && <div className="tree-item-children">{children}</div>}
		</div>
	);
};
