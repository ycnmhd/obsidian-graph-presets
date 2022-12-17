import { Command, Modal } from "obsidian";
import { PresetsModal } from "../components/presets-modal/presets-modal";

export const openGraphPresetsModal: Command = {
	id: "open-graph-presets-modal",
	name: "Open graph presets modal",
	callback: async () => {
		const modal = new Modal(app);
		PresetsModal({ modal });
		modal.open();
	},
};
