import React, { useCallback, useRef, useState } from "react";
import { openPreset } from "src/helpers/open-preset";
import { MarkdownPresetMeta } from "src/graph-presets";
import { rtf1, t } from "src/lang/text";

import { ApplyPreset } from "./apply-preset";
import { PresetViewType } from "src/views/preset/preset-view";
import { useAppSelector } from "src/store/hooks";
import { filesByCtime } from "src/store/cache/files-by-time";
import { getPresetDisplayText } from "src/views/preset/helpers/get-preset-display-text";

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
	const active = useAppSelector((state) => state.presets.activePreset);
	const preset = filesByCtime.current[meta.created];

	const name = (
		<span className="nav-file-title-content text-md ">
			{getPresetDisplayText(meta)}
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
			<div className="flex gap-2 items-center" aria-label={label}>
				<span>{name}</span>
				{meta.target === "local" ? (
					<span
						style={{
							color: "var(--text-on-accent)",
							backgroundColor: "var(--interactive-accent)",
						}}
						className={"px-1 rounded-b-sm"}
					>
						local
					</span>
				) : undefined}
			</div>
			<ApplyPreset meta={meta} />
		</div>
	);
};
