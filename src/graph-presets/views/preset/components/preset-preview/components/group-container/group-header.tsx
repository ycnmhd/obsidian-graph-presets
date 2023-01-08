import { svgs } from "src/assets/svgs";
import { ac } from "src/graph-presets/store/store";
import { graphSettingsGroup } from "src/types/apply-preset";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { t } from "src/graph-presets/lang/text";

const labels: Record<graphSettingsGroup, string> = {
	filters: t.c.FILTERS_GROUP,
	groups: t.c.GROUPS_GROUP,
	display: t.c.DISPLAY_GROUP,
	forces: t.c.FORCES_GROUP,
};

type Props = {
	group: graphSettingsGroup;
	meta: MarkdownPresetMeta;
	setCollapsed: (callback: (collapsed: boolean) => boolean) => void;
};

export const GroupHeader: React.FC<Props> = ({ group, meta, setCollapsed }) => {
	return (
		<div className="tree-item-self mod-collapsible items-center">
			<div
				className="tree-item-icon collapse-icon"
				onClick={() => setCollapsed((collapsed) => !collapsed)}
			>
				{svgs["obsidian-chevron"]}
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
					{svgs["document-check"]({
						width: 16,
						onClick: () => {
							ac.applyPreset({ ...meta, group });
						},
					})}
				</div>
				<div
					className="tree-item-icon "
					style={{ paddingInlineEnd: 0 }}
					aria-label={t.c.UPDATE_GROUP}
				>
					{svgs["edit"]({
						width: 14,
						onClick: () => {
							ac.updatePreset({ ...meta, group });
						},
					})}
				</div>
			</div>
		</div>
	);
};
