import { useEffect, useMemo, useRef, useState } from "react";
import { actions } from "src/graph-presets/actions/actions";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
import { rtf1, t } from "src/graph-presets/lang/text";

import { svgs } from "src/assets/svgs";
type Props = {
	meta: MarkdownPresetMeta;
};

export const PresetLabel: React.FC<Props> = ({ meta }) => {
	// const presets = GraphPresets.getInstance().settings.presets;
	const [tick, setTick] = useState(0);
	const intervalRef = useRef<ReturnType<typeof setInterval>>();
	useEffect(() => {
		const difference = Date.now() - meta.updated;
		const minutes = Math.floor(difference / (1000 * 60));
		if (minutes < 60) {
			intervalRef.current = setInterval(() => {
				setTick((tick) => tick + 1);
			}, 1000 * 60);
			return () => clearInterval(intervalRef.current);
		}
	}, [meta.updated]);
	const relativeTime = useMemo(() => {
		const difference = Date.now() - meta.updated;
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
	}, [meta.updated, tick]);
	const nameLabel = `Path: ${meta.path}`;
	const dateLabel = [
		`Created: ${new Date(meta.created).toLocaleString()}`,
		`Updated: ${new Date(meta.updated).toLocaleString()}`,
		meta.applied
			? `Last Applied: ${new Date(meta.applied).toLocaleString()}`
			: "",
	]
		.filter(Boolean)
		.join("\n");

	return (
		<>
			<div
				role="button"
				onClick={(e) => actions.openFile(meta, e.ctrlKey)}
				style={{ cursor: "pointer" }}
				aria-label={nameLabel}
				className="flex items-center gap-1"
			>
				<span>{meta.name}</span>
				{meta.starred &&
					svgs["lucid-star"]({
						width: 12,
						className: "text-yellow-400 fill-yellow-400",
					})}
			</div>
			<div className="setting-item-description" aria-label={dateLabel}>
				<div>{relativeTime} </div>
			</div>
		</>
	);
};
