import { configureStore, bindActionCreators } from "@reduxjs/toolkit";
import { acu } from "./ac";
import { openCreatedFileMiddleware } from "./effects/open-created-file";
import { presetsSlice } from "src/store/slices/presets-slice";
import { presetSlice } from "./slices/preset-slice";
import { preferencesSlice } from "./slices/preferences-slice";
import { saveSettingsMiddleware } from "./effects/save-settings";
import { loadPluginMiddleware } from "./effects/load-settings/load-plugin";
import { toggleFileEventListener } from "./effects/toggle-file-event-listener";
import { updateAttributeMiddleware } from "./effects/save-file";

export const store = configureStore({
	reducer: {
		presets: presetsSlice.reducer,
		preferences: preferencesSlice.reducer,
		preset: presetSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().prepend(
			...[
				saveSettingsMiddleware,
				openCreatedFileMiddleware,
				loadPluginMiddleware,
				toggleFileEventListener,
				updateAttributeMiddleware,
			]
		);
	},
});

export const getSnapshot = () => store.getState();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const ac = bindActionCreators(acu, store.dispatch);
