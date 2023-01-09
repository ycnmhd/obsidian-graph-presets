import { fileIsPreset } from "../helpers/file-is-preset";
import { ac } from "../store/store";

export const activeLeafEventListener = () =>
	app.workspace.on("active-leaf-change", () => {
		const activeFile = app.workspace.getActiveFile();
		if (activeFile && fileIsPreset(activeFile)) {
			ac.setActivePreset({ created: activeFile.stat.ctime });
		}
	});
