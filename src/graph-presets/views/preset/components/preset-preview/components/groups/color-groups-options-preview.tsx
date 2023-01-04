/* eslint-disable no-mixed-spaces-and-tabs */
import { GroupContainer } from "../group-container/group-container";
import { ColorGroupOptions } from "src/types/graph-settings";
import { ColorOption } from "../inputs/color-option";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { useColorGroups } from "./hooks/color-groups";
import { actions } from "src/graph-presets/actions/actions";
import { hexToRgb } from "../../helpers/map-colors";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
type Props = {
	options: ColorGroupOptions;
	meta: MarkdownPresetMeta;
};

export const ColorGroupsOptionsPreview: React.FC<Props> = ({
	options,
	meta,
}) => {
	const {
		state,
		updateColor,
		updateQuery,
		addGroup,
		removeGroup,
		sortGroups,
	} = useColorGroups(options.colorGroups, (groups) => {
		actions.saveAttribute(meta, {
			name: "colorGroups",
			value: groups,
		});
	});

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	return (
		<GroupContainer
			meta={meta}
			group="groups"
			collapsed={options["collapse-color-groups"]}
		>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={sortGroups}
			>
				<SortableContext
					items={state.groups.map((group, i) => ({
						...group,
						id: i+1,
					}))}
					strategy={verticalListSortingStrategy}
				>
					{state.groups.map((color, i) => (
						<ColorOption
							color={color}
							key={i+1}
							onColorChange={(value) => {
								updateColor(i, hexToRgb(value));
							}}
							onQueryChange={(query) => {
								updateQuery(i, query);
							}}
							removeGroup={() => removeGroup(i)}
							id={i+1}
						/>
					))}
					<div className="graph-color-button-container">
						<button className="mod-cta" onClick={addGroup}>
							New group
						</button>
					</div>
				</SortableContext>
			</DndContext>
		</GroupContainer>
	);
};
