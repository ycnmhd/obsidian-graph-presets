import { ViewState, WorkspaceLeaf } from "obsidian";

type State = {
	leafTypeMap: Map<WorkspaceLeaf, string>;
};

export class Router {
	private static instance: Router;
	private state: State = {
		leafTypeMap: new Map(),
	};
	private _viewType: string;
	private _frontmatter: string;
	private constructor() {}
	set viewType(viewType: string) {
		this._viewType = viewType;
	}
	get viewType() {
		return this._viewType;
	}
	set frontmatter(frontmatter: string) {
		this._frontmatter = frontmatter;
	}
	get frontmatter() {
		return this._frontmatter;
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new Router();
		}
		return this.instance;
	}

	setLeafType = async ({
		leaf,
		type,
		setState,
	}: {
		leaf: WorkspaceLeaf;
		type: string;
		setState?: boolean;
	}) => {
		this.state.leafTypeMap.set(leaf, type);
		if (setState || type === "markdown") {
			await leaf.setViewState(
				{
					type: type,
					state: leaf.view.getState(),
					popstate: true,
				} as ViewState,
				{ focus: setState }
			);
		}
	};

	getLeafType = (leaf: WorkspaceLeaf): string | undefined => {
		return this.state.leafTypeMap.get(leaf);
	};
}
