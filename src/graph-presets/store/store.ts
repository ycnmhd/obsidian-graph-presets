import { configureStore, bindActionCreators } from "@reduxjs/toolkit";
import { acu } from "./ac";
import { openCreatedFileMiddleware } from "./effects/open-created-file";
import { settingsMiddleware } from "./effects/save-settings";
import { preferencesSlice } from "./slices/preferences-slice";
import { presetsSlice } from "./slices/presets-slice";

export const store = configureStore({
	reducer: {
		presets: presetsSlice.reducer,
		preferences: preferencesSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().prepend(
			...[settingsMiddleware, openCreatedFileMiddleware]
		);
	},
});

export const getSnapshot = () => store.getState();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const ac = bindActionCreators(acu, store.dispatch);
