import { ViewState, WorkspaceLeaf } from "obsidian";

type State = {
	fileTypeMap: Map<string, string>;
};

export class Router {
	private static instance: Router;
	private state: State = {
		fileTypeMap: new Map(),
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

	setFileType = async ({
		path,
		type,
		leaf,
	}: {
		path: string;
		type: string;
		leaf?: WorkspaceLeaf;
	}) => {
		this.state.fileTypeMap.set(path, type);
		if (leaf) {
			leaf.setViewState({
				type: type,
				popstate: true,
				state: leaf.view.getState(),
			} as ViewState);
		}
	};

	getFileType = (path: string): string | undefined => {
		return this.state.fileTypeMap.get(path);
	};
}
