import { ViewState, WorkspaceLeaf } from "obsidian";
import { FRONTMATTER_KEY } from "src/graph-presets/helpers/constants";
import { PresetViewType } from "../preset-view";

type State = {
	fileTypeMap: Map<string, string>;
};

export class Router {
	private static instance: Router;
	private state: State = {
		fileTypeMap: new Map(),
	};
	private _viewType: string = PresetViewType;
	private _frontmatter: string = FRONTMATTER_KEY;
	private constructor() {}

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

	get viewType() {
		return this._viewType;
	}

	get frontmatter() {
		return this._frontmatter;
	}
}
