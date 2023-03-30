import { WorkspaceLeaf } from "obsidian";
import { t } from "src/lang/text";

const nameMap = {
	graph: t.c.GLOBAL_GRAPH,
	localgraph: t.c.LOCAL_GRAPH,
};

type Props = {
	leaf: WorkspaceLeaf;
	setActiveLeaf: (leaf: WorkspaceLeaf) => void;
	activeLeaf: WorkspaceLeaf | null;
	setSelectedLeaf: (leaf: WorkspaceLeaf) => void;
};

export const GraphLeafListItem: React.FC<Props> = ({
	leaf,
	setActiveLeaf,
	activeLeaf,
	setSelectedLeaf,
}) => {
	const isActive = activeLeaf === leaf;
	const openLeaf = () => {
		app.workspace.setActiveLeaf(leaf);
		setActiveLeaf(leaf);
	};
	const selectLeaf = () => {
		setSelectedLeaf(leaf);
	};

	return (
		<div
			className="hover:bg-[var(--background-modifier-hover)]"
			style={{
				width: "100%",
				boxSizing: "border-box",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "5px 10px",
			}}
		>
			<span>
				{nameMap[leaf.view.getViewType() as "graph" | "localgraph"]}
			</span>

			{
				<button
					style={{ width: 60 }}
					onClick={isActive ? selectLeaf : openLeaf}
					className={isActive ? "mod-cta" : ""}
				>
					{isActive ? t.c.SELECT : t.c.FOCUS}
				</button>
			}
		</div>
	);
};
