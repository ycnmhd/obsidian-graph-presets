import { EventRef } from "obsidian";

export const unsubscribeFromEvent = (eventRef: EventRef) => {
	(eventRef as any).e.offref(eventRef);
};
