import { FilterOptions } from "src/types/graph-settings";
import { GroupContainer } from "../group-container/group-container";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { TextInput } from "../inputs/text-input";
import { Toggle } from "../inputs/toggle";

type Props = {
	options: FilterOptions;
	meta: MarkdownPresetMeta;
};

export const FilterOptionsPreview: React.FC<Props> = ({ options, meta }) => {
	return (
		<GroupContainer meta={meta} group="filters">
			<TextInput value={options.search} placeholder="Search files..." />
			<Toggle enabled={options.showTags} name="Tags" />
			<Toggle enabled={options.showAttachments} name="Attachments" />
			<Toggle
				enabled={options.hideUnresolved}
				name="Existing files only"
			/>
			<Toggle enabled={options.showOrphans} name="Orphans" />
		</GroupContainer>
	);
};