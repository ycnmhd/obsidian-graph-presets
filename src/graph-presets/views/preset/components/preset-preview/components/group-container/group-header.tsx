import { Menu } from "obsidian";
import { svgs } from "src/assets/svgs";
import { actions } from "src/graph-presets/actions/actions";
import { graphSettingsGroup } from "src/graph-presets/actions/apply-preset";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";

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
					{group}
				</header>
			</div>
			<div
				className="tree-item-icon"
				style={{ paddingInlineEnd: 0 }}
				onClick={(event) => {
					const menu = new Menu();
					menu.addItem((item) => {
						item.setTitle("Apply");
						item.setIcon("document");
						item.onClick(async () => {
							actions.applyPreset(meta, group);
						});
					});
					menu.addItem((item) => {
						item.setTitle("Update");
						item.setIcon("edit");
						item.onClick(async () => {
							await actions.updatePreset(meta, group);
						});
					});

					menu.showAtMouseEvent(event as any as MouseEvent);
				}}
				aria-label="More options"
			>
				{svgs["ellipsis-vertical"]({ width: 16 })}
			</div>
		</div>
	);
};
