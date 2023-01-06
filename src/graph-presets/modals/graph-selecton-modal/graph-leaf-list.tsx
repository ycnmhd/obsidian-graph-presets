import { WorkspaceLeaf } from "obsidian";
import { useState } from "react";
import { getActiveGraphLeaves } from "../../../obsidian/graph/get-graph-leaf/helpers/get-active-graph-leaves";
import { GraphLeafListItem } from "./graph-leaf-list-item";

type Props = {
	onSelection: (leaf: WorkspaceLeaf) => void;
};

export const GraphLeafList: React.FC<Props> = ({ onSelection }) => {
	const leaves = getActiveGraphLeaves();
	const [activeLeaf, setActiveLeaf] = useState<WorkspaceLeaf | null>(
		app.workspace.getLeaf()
	);
	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				gap: 5,
			}}
		>
			{leaves.map((leaf, i) => (
				<GraphLeafListItem
					leaf={leaf}
					key={i}
					setActiveLeaf={setActiveLeaf}
					activeLeaf={activeLeaf}
					setSelectedLeaf={onSelection}
				/>
			))}
		</div>
	);
};
