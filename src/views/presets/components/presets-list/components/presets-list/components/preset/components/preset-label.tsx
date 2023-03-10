import React, { useCallback, useRef, useState } from "react";
import { openPreset } from "src/helpers/open-preset";
import { MarkdownPresetMeta } from "src/graph-presets";
import { rtf1, t } from "src/lang/text";

import { ApplyPreset } from "./apply-preset";
import { PresetViewType } from "src/views/preset/preset-view";
import { useAppSelector } from "src/store/hooks";
import { Star } from "src/assets/svg/lucid/star";
import { filesByCtime } from "../../../../../../../../../store/cache/files-by-time";

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
	const starred = useAppSelector((state) => state.presets.starredPresets);
	const active = useAppSelector((state) => state.presets.activePreset);
	const preset = filesByCtime.current[meta.created];
	const star = starred[meta.created] && (
		<Star width={12} fill={"#facc15"} color={"#facc15"} />
	);
	const name = (
		<span className="nav-file-title-content text-md ">
			{preset.basename}
		</span>
	);

	const [label, setLabel] = useState("");
	const onDragStart = useCallback(
		(event: React.DragEvent) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const dragManager = (app as any).dragManager;
			const dragData = dragManager.dragFile(event, preset);
			dragManager.onDragStart(event, dragData);
		},
		[preset]
	);

	const onMouseOver = useCallback((event: React.MouseEvent) => {
		app.workspace.trigger("hover-link", {
			event,
			source: PresetViewType,
			hoverParent: ref.current,
			targetEl: ref.current,
			linktext: preset.path,
		});
	}, []);

	const onMouseEnter = useCallback(() => {
		setLabel(relativeTime(preset.stat.mtime));
	}, [meta]);

	const ref = useRef<HTMLDivElement>(null);
	return (
		<div
			className={
				"nav-file-title " +
				(active === meta.created ? " is-active" : "")
			}
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				width: "100%",
			}}
			onClick={(e) => openPreset(meta, e.ctrlKey)}
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
