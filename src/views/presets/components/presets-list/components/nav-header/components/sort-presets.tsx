import { Menu } from "obsidian";
import { ac } from "src/store/store";
import { t } from "src/lang/text";
import { SortMode } from "src/settings/default-settings";
import { SortDesc } from "src/assets/svg/lucid/sort-desc";

type Props = {
	sortBy: SortMode;
};

const modes: { mode: SortMode; label: string }[][] = [
	[
		{ mode: "presetNameAsc", label: t.c.SORT_BY_PRESET_NAME_ASC },
		{ mode: "presetNameDesc", label: t.c.SORT_BY_PRESET_NAME_DESC },
	],
	[
		{ mode: "dateCreatedDesc", label: t.c.SORT_BY_DATE_CREATED_DESC },
		{ mode: "dateCreatedAsc", label: t.c.SORT_BY_DATE_CREATED_ASC },
	],
	[
		{ mode: "dateModifiedDesc", label: t.c.SORT_BY_DATE_MODIFIED_DESC },
		{ mode: "dateModifiedAsc", label: t.c.SORT_BY_DATE_MODIFIED_ASC },
	],
	[
		{ mode: "dateAppliedDesc", label: t.c.SORT_BY_DATE_APPLIED_DESC },
		{ mode: "dateAppliedAsc", label: t.c.SORT_BY_DATE_APPLIED_ASC },
	],
];

export const SortPresets: React.FC<Props> = ({ sortBy }) => {
	return (
		<div
			className="clickable-icon nav-action-button"
			aria-label={t.c.SORT_BY}
			onClick={(event) => {
				const menu = new Menu();
				modes.forEach((modes) => {
					modes.forEach((mode) => {
						menu.addItem((item) => {
							item.setTitle(mode.label);
							item.onClick(async () => {
								ac.setSortBy(mode.mode);
							});
							item.setChecked(mode.mode === sortBy);
						});
					});
					menu.addSeparator();
				});

				menu.showAtMouseEvent(event as any as MouseEvent);
			}}
		>
			<SortDesc width={18} />
		</div>
	);
};
