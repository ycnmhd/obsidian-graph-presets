import { Menu } from "obsidian";
import { svgs } from "src/assets/svgs";
import { actions } from "src/graph-presets/actions/actions";
import { SortMode } from "src/graph-presets/settings/default-settings";

type Props = {
	sortBy: SortMode;
};

const modes: { mode: SortMode; label: string }[][] = [
	[
		{ mode: "presetNameAsc", label: "Preset name (A to Z)" },
		{ mode: "presetNameDesc", label: "Preset name (Z to A)" },
	],
	[
		{ mode: "dateCreatedAsc", label: "Date created (new to old)" },
		{ mode: "dateCreatedDesc", label: "Date created (old to new)" },
	],
	[
		{ mode: "dateModifiedAsc", label: "Date modified (new to old)" },
		{ mode: "dateModifiedDesc", label: "Date modified (old to new)" },
	],
    [
        { mode: "dateAppliedAsc", label: "Date applied (new to old)" },
        { mode: "dateAppliedDesc", label: "Date applied (old to new)" },
    ]
];

export const SortPresets: React.FC<Props> = ({ sortBy }) => {
	return (
		<div
			className="clickable-icon nav-action-button"
			aria-label="Sort presets"
			onClick={(event) => {
				const menu = new Menu();
				modes.forEach((modes) => {
					modes.forEach((mode) => {
						menu.addItem((item) => {
							item.setTitle(mode.label);
							item.onClick(async () => {
                                await actions.setSortBy(mode.mode);
                            });
							item.setChecked(mode.mode === sortBy);
						});
					});
					menu.addSeparator();
				});

				menu.showAtMouseEvent(event as any as MouseEvent);
			}}
		>
			{svgs["bars-3-bottom-right"]}
		</div>
	);
};
