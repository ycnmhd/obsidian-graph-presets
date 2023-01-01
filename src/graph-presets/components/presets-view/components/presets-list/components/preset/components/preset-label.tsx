import { useMemo } from "react";
import { actions } from "src/graph-presets/actions/actions";
import { MarkdownPresetMeta } from "src/graph-presets/graph-presets";
const rtf1 = new Intl.RelativeTimeFormat("en", { style: "long" });
type Props = {
	meta: MarkdownPresetMeta;
};

export const PresetLabel: React.FC<Props> = ({ meta }) => {
	// const presets = GraphPresets.getInstance().settings.presets;
	const relativeTime = useMemo(() => {
		const difference = Date.now() - meta.updated;
		const days = Math.floor(difference / (1000 * 60 * 60 * 24));
		const hours = Math.floor(difference / (1000 * 60 * 60));
		const minutes = Math.floor(difference / (1000 * 60));

		let relativeTime;
		if (days > 0) {
			relativeTime = rtf1.format(-days, "day");
		} else if (hours > 0) {
			relativeTime = rtf1.format(-hours, "hour");
		} else if (minutes > 0) {
			relativeTime = rtf1.format(-minutes, "minute");
		} else {
			relativeTime = "just now";
		}
		return "Updated " + relativeTime;
	}, [meta.updated]);
	return (
		<>
			<div role="button" onClick={(e) => actions.openFile(meta, e.ctrlKey)} style={{cursor:"pointer"}}>
				{meta.name}
			</div>
			<div className="setting-item-description">
				<div>{relativeTime} </div>
			</div>
		</>
	);
};
