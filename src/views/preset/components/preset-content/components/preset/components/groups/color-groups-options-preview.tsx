import { GroupContainer } from "../group-container/group-container";
import { ColorOption } from "../inputs/color-option";

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
import { GroupProps } from "./filter-options-preview";
import { useAppSelector } from "src/store/hooks";
import { ac } from "src/store/store";
import { FC } from "react";

export const ColorGroupsOptionsPreview: FC<GroupProps> = ({ created }) => {
	const colorGroups = useAppSelector(
		(state) => state.preset.presets[created].colorGroups,
		(a, b) => a.length === b.length
	);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	return (
		<GroupContainer created={created} group="groups">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={(event) => {
					if (!event.over) return;
					if (event.over.id === event.active.id) return;
					ac.sortColorGroup({
						created,
						newIndex: (event.over.id as number) - 1,
						oldIndex: (event.active.id as number) - 1,
					});
				}}
			>
				<SortableContext
					items={colorGroups.map((group, i) => ({
						...group,
						id: i + 1,
					}))}
					strategy={verticalListSortingStrategy}
				>
					{colorGroups.map((color, i) => (
						<ColorOption
							key={i}
							id={i + 1}
							index={i}
							created={created}
						/>
					))}
					<div className="graph-color-button-container">
						<button
							className="mod-cta"
							onClick={() =>
								ac.addColorGroup({
									created,
								})
							}
						>
							New group
						</button>
					</div>
				</SortableContext>
			</DndContext>
		</GroupContainer>
	);
};
