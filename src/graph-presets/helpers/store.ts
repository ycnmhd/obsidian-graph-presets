export class Store<T> {
	value: T;
	subscribers: Set<() => void> = new Set();

	subscribe = (subscriber: () => void) => {
		this.subscribers.add(subscriber);
		return () => this.subscribers.delete(subscriber);
	};
	getSnapshot = () => this.value;
	set = (value: Partial<T>|((value: T) => Partial<T>)) => {
		if (typeof value === "function") {
			value = value(this.value);
		}
		this.value = { ...this.value, ...value };
		this.subscribers.forEach((subscriber) => {		
			return subscriber();
		});
	};
}
