export class Store<T> {
	value: T;
	subscribers: Set<() => void> = new Set();

	subscribe = (subscriber: () => void) => {
		this.subscribers.add(subscriber);
		return () => this.subscribers.delete(subscriber);
	};
	getSnapshot = () => this.value;
	set = (value: T) => {
		this.value = { ...value };
		this.subscribers.forEach((subscriber) => subscriber());
	};
}
