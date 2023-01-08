import { fileIsPresetAsync } from "../helpers/file-is-preset";
import { ac } from "../store/store";

export const activeLeafEventListener = () =>
	app.workspace.on("active-leaf-change", async () => {
		const activeFile = app.workspace.getActiveFile();
		if (activeFile && (await fileIsPresetAsync(activeFile))) {
			ac.setActivePreset({ created: activeFile.stat.ctime });
		}
	});
