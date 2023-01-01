import { Menu } from "obsidian";
import { svgs } from "src/assets/svgs";
import { actions } from "src/graph-presets/actions/actions";
import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";
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
		<div className="tree-item-self mod-collapsible ">
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
				<header className="graph-control-section-header">
					{labels[group]}
				</header>
			</div>
			<div
				className="tree-item-icon"
				style={{ paddingInlineEnd: 0 }}
				onClick={(event) => {
					const menu = new Menu();
					menu.addItem((item) => {
						item.setTitle(t.c.APPLY_GROUP);
						item.setIcon("document");
						item.onClick(async () => {
							actions.applyPreset(meta, group);
						});
					});
					menu.addItem((item) => {
						item.setTitle(t.c.UPDATE_GROUP);
						item.setIcon("edit");
						item.onClick(async () => {
							await actions.updatePreset(meta, group);
						});
					});

					menu.showAtMouseEvent(event as any as MouseEvent);
				}}
				aria-label={t.c.MORE_OPTIONS}
			>
				{svgs["ellipsis-vertical"]({ width: 16 })}
			</div>
		</div>
	);
};
