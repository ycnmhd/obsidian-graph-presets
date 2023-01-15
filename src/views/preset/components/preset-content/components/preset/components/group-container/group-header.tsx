import { ac } from "src/store/store";
import { graphSettingsGroup } from "src/types/apply-preset";
import { t } from "src/lang/text";
import { ChevronDown } from "src/assets/svg/lucid/obsidian-chevron";
import React from "react";
import { Check } from "src/assets/svg/lucid/check";
import { ArrowDown } from "src/assets/svg/lucid/arrow-down";

const labels: Record<graphSettingsGroup, string> = {
	filters: t.c.FILTERS_GROUP,
	groups: t.c.GROUPS_GROUP,
	display: t.c.DISPLAY_GROUP,
	forces: t.c.FORCES_GROUP,
};

type Props = {
	group: graphSettingsGroup;
	created: number;
	setCollapsed: (callback: (collapsed: boolean) => boolean) => void;
};

export const GroupHeader: React.FC<Props> = ({
	group,
	created,
	setCollapsed,
}) => {
	return (
		<div className="tree-item-self mod-collapsible items-center">
			<div
				className="tree-item-icon collapse-icon"
				onClick={() => setCollapsed((collapsed) => !collapsed)}
			>
				<ChevronDown />
			</div>
			<div
				className="tree-item-inner"
				onClick={() => setCollapsed((collapsed) => !collapsed)}
			>
				<header className="graph-control-section-header text-lg">
					{labels[group]}
				</header>
			</div>
			<div
				className="opacity-0 group-hover:opacity-100"
				style={{
					display: "flex",
					alignItems: "center",
					gap: 5,
					marginRight: -8,
				}}
			>
				<div
					className="tree-item-icon "
					style={{ paddingInlineEnd: 0 }}
					aria-label={t.c.APPLY_GROUP}
				>
					<Check
						width={16}
						onClick={() => {
							ac.applyPreset({ created, group });
						}}
					/>
				</div>
				<div
					className="tree-item-icon "
					style={{ paddingInlineEnd: 0 }}
					aria-label={t.c.UPDATE_GROUP}
				>
					<ArrowDown
						width={16}
						onClick={() => {
							ac.updatePreset({ created, group });
						}}
					/>
				</div>
			</div>
		</div>
	);
};
