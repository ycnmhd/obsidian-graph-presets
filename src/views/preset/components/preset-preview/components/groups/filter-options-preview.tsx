import { FilterOptions } from "src/types/graph-settings";
import { GroupContainer } from "../group-container/group-container";
import { MarkdownPresetMeta } from "src/graph-presets";
import { TextInput } from "../inputs/text-input/text-input";
import { Toggle } from "../inputs/toggle";
import { Slider } from "../inputs/slider";
import { UpdateAttribute } from "src/views/preset/preset-view";
import { useCallback } from "react";

type Props = {
	options: FilterOptions;
	meta: MarkdownPresetMeta;
	updateAttribute: UpdateAttribute;
};

export const FilterOptionsPreview: React.FC<Props> = ({
	options,
	meta,
	updateAttribute,
}) => {
	const onSearchChange = useCallback(
		(value: string) => updateAttribute("search", value),
		[]
	);

	return (
		<GroupContainer
			meta={meta}
			group="filters"
			collapsed={options["collapse-filter"]}
			updateAttribute={updateAttribute}
		>
			<TextInput
				value={options.search}
				placeholder="Search files..."
				onChange={onSearchChange}
			/>
			{typeof options.localJumps === "number" && (
				<Slider
					name="localJumps"
					value={options.localJumps}
					min={1}
					max={5}
					onChange={updateAttribute}
				/>
			)}
			{typeof options.localBacklinks === "boolean" && (
				<Toggle
					enabled={options.localBacklinks}
					name="localBacklinks"
					onChange={updateAttribute}
				/>
			)}
			{typeof options.localForelinks === "boolean" && (
				<Toggle
					enabled={options.localForelinks}
					name="localForelinks"
					onChange={updateAttribute}
				/>
			)}
			{typeof options.localInterlinks === "boolean" && (
				<Toggle
					enabled={options.localInterlinks}
					name="localInterlinks"
					onChange={updateAttribute}
				/>
			)}
			<Toggle
				enabled={options.showTags}
				name="showTags"
				onChange={updateAttribute}
			/>
			<Toggle
				enabled={options.showAttachments}
				name="showAttachments"
				onChange={updateAttribute}
			/>
			<Toggle
				enabled={options.hideUnresolved}
				name="hideUnresolved"
				onChange={updateAttribute}
			/>
			{typeof options.showOrphans === "boolean" && (
				<Toggle
					enabled={options.showOrphans}
					name="showOrphans"
					onChange={updateAttribute}
				/>
			)}
		</GroupContainer>
	);
};
