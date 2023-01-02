import { FilterOptions } from "src/types/graph-settings";
import { GroupContainer } from "../group-container/group-container";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { TextInput } from "../inputs/text-input";
import { Toggle } from "../inputs/toggle";
import { useOnChange } from "../inputs/hooks/on-change";

type Props = {
	options: FilterOptions;
	meta: MarkdownPresetMeta;
};

export const FilterOptionsPreview: React.FC<Props> = ({ options, meta }) => {
	const onSearchChange = useOnChange(meta.created, "search");
	const onShowTagsChange = useOnChange(meta.created, "showTags");
	const onShowAttachmentsChange = useOnChange(
		meta.created,
		"showAttachments"
	);
	const onHideUnresolvedChange = useOnChange(meta.created, "hideUnresolved");
	const onShowOrphansChange = useOnChange(meta.created, "showOrphans");

	return (
		<GroupContainer meta={meta} group="filters">
			<TextInput
				value={options.search}
				placeholder="Search files..."
				onChange={onSearchChange}
			/>
			<Toggle
				enabled={options.showTags}
				name="Tags"
				onChange={onShowTagsChange}
			/>
			<Toggle
				enabled={options.showAttachments}
				name="Attachments"
				onChange={onShowAttachmentsChange}
			/>
			<Toggle
				enabled={options.hideUnresolved}
				name="Existing files only"
				onChange={onHideUnresolvedChange}
			/>
			<Toggle
				enabled={options.showOrphans}
				name="Orphans"
				onChange={onShowOrphansChange}
			/>
		</GroupContainer>
	);
};
