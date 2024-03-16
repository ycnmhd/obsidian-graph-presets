import { graphSettingsGroup } from "src/types/apply-preset";
import { t } from "src/lang/text";
import { ChevronDown } from "src/assets/svg/lucid/obsidian-chevron";
import React from "react";
import { GroupHeaderButtons } from "src/views/preset/components/preset-content/components/preset/components/group-container/group-header-buttons";

const labels: Record<graphSettingsGroup, string> = {
	filters: t.c.FILTERS_GROUP,
	groups: t.c.GROUPS_GROUP,
	display: t.c.DISPLAY_GROUP,
	forces: t.c.FORCES_GROUP,
};

type Props = {
	group: graphSettingsGroup;
	created: number;
	collapsed: boolean;
	setCollapsed: (callback: (collapsed: boolean) => boolean) => void;
};

export const GroupHeader: React.FC<Props> = ({
	group,
	created,
	collapsed,
	setCollapsed,
}) => {
	return (
		<div className="items-center flex justify-between">
			<div
				className={"flex items-center gap-2 flex-1"}
				onClick={() => setCollapsed((collapsed) => !collapsed)}
			>
				<div
					className={`tree-item-icon collapse-icon transition-transform ${
						collapsed ? "-rotate-90" : ""
					}`}
				>
					<ChevronDown className={"svg-icon"} />
				</div>
				<div
					className="tree-item-inner"
					onClick={() => setCollapsed((collapsed) => !collapsed)}
				>
					<header className="graph-control-section-header text-lg">
						{labels[group]}
					</header>
				</div>
			</div>
			<GroupHeaderButtons group={group} created={created} />
		</div>
	);
};
