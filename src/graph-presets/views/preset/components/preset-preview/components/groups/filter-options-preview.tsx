import { FilterOptions } from "src/types/graph-settings";
import { GroupContainer } from "../group-container/group-container";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { TextInput } from "../inputs/text-input/text-input";
import { Toggle } from "../inputs/toggle";
import { useOnChange } from "../inputs/hooks/on-change";
import { Slider } from "../inputs/slider";

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
	const onLocalJumpsChange = useOnChange(meta.created, "localJumps");
	const onLocalBacklinksChange = useOnChange(meta.created, "localBacklinks");
	const onLocalForelinksChange = useOnChange(meta.created, "localForelinks");
	const onLocalInterlinksChange = useOnChange(
		meta.created,
		"localInterlinks"
	);
	return (
		<GroupContainer
			meta={meta}
			group="filters"
			collapsed={options["collapse-filter"]}
		>
			<TextInput
				value={options.search}
				placeholder="Search files..."
				onChange={onSearchChange}
			/>
			{typeof options.localJumps === "number" && (
				<Slider
					name="Depth"
					value={options.localJumps}
					min={1}
					max={5}
					onChange={onLocalJumpsChange}
				/>
			)}
			{typeof options.localBacklinks === "boolean" && (
				<Toggle
					enabled={options.localBacklinks}
					name="Incoming links"
					onChange={onLocalBacklinksChange}
				/>
			)}
			{typeof options.localForelinks === "boolean" && (
				<Toggle
					enabled={options.localForelinks}
					name="Outgoing links"
					onChange={onLocalForelinksChange}
				/>
			)}
			{typeof options.localInterlinks === "boolean" && (
				<Toggle
					enabled={options.localInterlinks}
					name="Neighbor links"
					onChange={onLocalInterlinksChange}
				/>
			)}
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
			{typeof options.showOrphans === "boolean" && (
				<Toggle
					enabled={options.showOrphans}
					name="Orphans"
					onChange={onShowOrphansChange}
				/>
			)}
		</GroupContainer>
	);
};
