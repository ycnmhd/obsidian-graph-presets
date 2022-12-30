/* 
	Based on https://github.com/RafaelGB/obsidian-db-folder/blob/91f08085da0c71276407f034775f892497f661a2/src/StateManager.ts#L4
*/
import { TFile } from "obsidian";

export interface IView {
	file: TFile;
	render: () => Promise<void>; 
	reload: () => Promise<void>; 
    destroy: () => Promise<void>; 
    get id(): string;
    getWindow : () => Window;
}

export  class StateManager<View extends IView> {
	private onEmpty: () => void;

	private viewSet: Set<View> = new Set();
	public file: TFile;
	constructor(initialView: View, onEmpty: () => void) {
		this.file = initialView.file;
		this.onEmpty = onEmpty;

		this.registerView(initialView);
	}

	registerView(view: View) {
		if (!this.viewSet.has(view)) {
			this.viewSet.add(view);
			view.render();
		}
	}

	unregisterView(view: View) {
		if (this.viewSet.has(view)) {
			this.viewSet.delete(view);

			if (this.viewSet.size === 0) {
				this.onEmpty();
			}
		}
	}

	getAView(): View {
		return this.viewSet.values().next().value;
	}

	async forceRefresh() {
		this.viewSet.forEach((view) => {
			view.reload();
		});
	}
}
