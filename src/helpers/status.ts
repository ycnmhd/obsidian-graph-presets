import { logger } from "./logger";

type Callback = () => void;
export class Status {
	private onReadyCallbacks: Set<Callback> = new Set();

	private _ready = false;
	private readonly _readyPromise: Promise<boolean> = new Promise(
		(resolve) => {
			this.setReady = () => {
				if (!this._ready) {
					resolve(true);
					this._ready = true;
					this.onReadyCallbacks.forEach((callback) => {
						this.onReadyCallbacks.delete(callback);
						try {
							callback();
						} catch (e) {
							logger.error(e);
						}
					});
				}
			};
		}
	);
	setReady: (value: boolean) => void;

	onReady(callback: Callback) {
		if (this._ready) {
			callback();
		} else {
			this.onReadyCallbacks.add(callback);
		}
	}

	get ready() {
		return this._ready;
	}
}
