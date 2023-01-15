import { TFile } from "obsidian";

type ArgsType<T> = T extends (...args: infer U) => any ? U : never;

export const createAsyncGetter =
	<T extends (...args: ArgsType<T>) => ReturnType<T>>(
		getter: T,
		delay = 3000
	) =>
	async (...args: ArgsType<T>): Promise<ReturnType<T> | null> => {
		const state = {
			data: null as null | ReturnType<T>,
			remainingAttempts: Math.floor(delay / 100),
		};
		do {
			state.data = getter(...args);
			if (!state.data) {
				state.remainingAttempts--;
				await new Promise((res) => setTimeout(res, 100));
			}
		} while (!state.data && state.remainingAttempts);
		return state.data;
	};

export const getMarkdownFilesAsync = createAsyncGetter(() => {
	const md = app.vault.getMarkdownFiles();
	if (md.length) return md;
}, 60000);

export const getAbstractFileByPathAsync = createAsyncGetter((path: string) =>
	app.vault.getAbstractFileByPath(path)
);

export const getFileCacheAsync = createAsyncGetter((file: TFile) =>
	app.metadataCache.getFileCache(file)
);
