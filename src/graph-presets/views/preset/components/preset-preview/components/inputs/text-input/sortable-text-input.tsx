import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { TextInputBody, TextInputProps } from "./text-input-body";
type Props = TextInputProps & {
	id: string | number;
};
type SortableEvent =
	| React.PointerEvent<HTMLDivElement>
	| React.KeyboardEvent<HTMLDivElement>;
const sortableWrapper =
	(handler: React.EventHandler<SortableEvent>) => (e: SortableEvent) => {
		const target = e.target as HTMLElement;
		if (target.localName === "textarea") {
			return;
		}
		let svg;
		if (target.localName === "path") {
			svg = target.closest("svg");
		} else if (target.localName === "svg") {
			svg = target;
		}
		if (svg && svg.dataset.nonDraggable) {
			return;
		}
		handler(e as SortableEvent);
	};

export const SortableTextInput: React.FC<Props> = ({ id, ...props }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: id });
	const style = {
		transform: CSS.Transform.toString({
			...transform,
			scaleX: 1,
			scaleY: 1,
		} as any),
		transition,
	};
	const onKeyDown = sortableWrapper((listeners as any).onKeyDown);
	const onPointerDown = sortableWrapper((listeners as any).onPointerDown);
	return (
		<div
			className="setting-item mod-search-setting relative group"
			ref={setNodeRef}
			style={style}
			onKeyDown={onKeyDown}
			onPointerDown={onPointerDown}
			{...attributes}
		>
			<TextInputBody {...props} sortable={true} />
		</div>
	);
};
