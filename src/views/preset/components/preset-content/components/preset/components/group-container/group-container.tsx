import classnames from "classnames";
import { GroupHeader } from "./group-header";
import { graphSettingsGroup } from "src/types/apply-preset";
import { GraphSettings } from "src/types/graph-settings";
import AnimateHeight from "react-animate-height";
import { useAppSelector } from "src/store/hooks";
import { ac } from "src/store/store";

const collapsedStateKeys: Record<graphSettingsGroup, keyof GraphSettings> = {
	filters: "collapse-filter",
	groups: "collapse-color-groups",
	display: "collapse-display",
	forces: "collapse-forces",
};

type Props = {
	created: number;
	group: graphSettingsGroup;
	children?: React.ReactNode;
};

export const GroupContainer: React.FC<Props> = ({
	group,
	created,
	children,
}) => {
	const collapsed = useAppSelector(
		(state) => state.preset.presets[created][collapsedStateKeys[group]]
	);

	return (
		<div
			className={classnames(
				"tree-item graph-control-section ",
				collapsed ? "is-collapsed" : "",
				"border-none rounded-md shadow-md ",
				"py-3 px-6",
				"group"
			)}
			style={{
				backgroundColor: "var(--background-primary)",
				flex: 1,
				minWidth: 150,
				height: collapsed ? "fit-content" : "auto",
			}}
		>
			<GroupHeader
				created={created}
				group={group}
				setCollapsed={() => {
					ac.updateAttribute({
						created,
						name: collapsedStateKeys[group],
						value: !collapsed,
					});
				}}
			/>

			<AnimateHeight
				id={group}
				duration={200}
				height={!collapsed ? "auto" : 0}
			>
				<div className="tree-item-children mt-3">{children}</div>
			</AnimateHeight>
		</div>
	);
};
