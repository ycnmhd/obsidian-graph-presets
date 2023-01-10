import { FileEvent } from "src/store/slices/presets-slice";
import { deleteEventListener } from "./delete-event-listener";
import { modifyEventListener } from "./modify-event-listener";
import { renameEventListener } from "./rename-event-listener";

export const fileEvent: Record<FileEvent, typeof deleteEventListener> = {
	modify: modifyEventListener,
	rename: renameEventListener,
	delete: deleteEventListener,
};
