import React, {
	useCallback,
	useRef,
	useState,
} from "react";
import { actions } from "src/graph-presets/actions/actions";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { rtf1, t } from "src/graph-presets/lang/text";

import { svgs } from "src/assets/svgs";
import { ApplyPreset } from "./apply-preset";
import { PresetViewType } from "src/graph-presets/views/preset/preset-view";

const relativeTime = (updated: number) => {
	const difference = Date.now() - updated;
	const days = Math.floor(difference / (1000 * 60 * 60 * 24));
	const hours = Math.floor(difference / (1000 * 60 * 60));
	const minutes = Math.floor(difference / (1000 * 60));

	let relativeTime;
	if (days > 0) {
		relativeTime = rtf1.c.format(-days, "day");
	} else if (hours > 0) {
		relativeTime = rtf1.c.format(-hours, "hour");
	} else if (minutes > 0) {
		relativeTime = rtf1.c.format(-minutes, "minute");
	} else {
		relativeTime = t.c.JUST_NOW;
	}
	return t.c.UPDATED + relativeTime;
};

type Props = {
	meta: MarkdownPresetMeta;
};

export const PresetLabel: React.FC<Props> = ({ meta }) => {
	const star =
		meta.starred &&
		svgs["lucid-star"]({
			width: 12,
			fill: "#facc15",
			color: "#facc15",
		});
	const name = (
		<span className="nav-file-title-content text-md ">{meta.name}</span>
	);

	const [label, setLabel] = useState("");
	const onDragStart = useCallback(
		(event: React.DragEvent) => {
			const file = app.metadataCache.getFirstLinkpathDest(meta.path, "");

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const dragManager = (app as any).dragManager;
			const dragData = dragManager.dragFile(event, file);
			dragManager.onDragStart(event, dragData);
		},
		[meta.path]
	);

	const onMouseOver = useCallback(
		(event: React.MouseEvent) => {
			app.workspace.trigger("hover-link", {
				event,
				source: PresetViewType,
				hoverParent: ref.current,
				targetEl: ref.current,
				linktext: meta.path,
			});
		},
		[meta.path]
	);

	const onMouseEnter = useCallback(
		(event: React.MouseEvent) => {
			setLabel(relativeTime(meta.updated));
		},
		[meta.updated]
	);

	const ref = useRef<HTMLDivElement>(null);
	return (
		<div
			className={
				"nav-file-title flex items-center justify-between w-full" +
				(meta.active ? " is-active" : "")
			}
			onClick={(e) => actions.openFile(meta, e.ctrlKey)}
			draggable="true"
			onDragStart={onDragStart}
			onMouseOver={onMouseOver}
			onMouseEnter={onMouseEnter}
			ref={ref}
		>
			<div className="flex gap-1 items-center" aria-label={label}>
				{name}
				{star}
			</div>
			<ApplyPreset meta={meta} />
		</div>
	);
};
