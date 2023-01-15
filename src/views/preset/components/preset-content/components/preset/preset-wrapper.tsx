import { store } from "src/store/store";
import { Preset } from "src/views/preset/components/preset-content/components/preset/preset";
import { Provider } from "react-redux";
import { useSyncExternalStore } from "react";
import { PresetView } from "src/views/preset/preset-view";

type Props = {
	viewStore: typeof PresetView.prototype.store;
};

export const PresetWrapper = ({ viewStore }: Props) => {
	const { created, parsingError } = useSyncExternalStore(
		viewStore.subscribe,
		viewStore.getSnapshot
	);

	if (!created) return null;
	if (parsingError)
		return (
			<div className="flex flex-col justify-center items-center h-full ">
				<h2>There was an error parsing the preset file</h2>
				<p className={"text-red-500"}>{parsingError}</p>
			</div>
		);
	return (
		<Provider store={store}>
			<Preset created={created} />
		</Provider>
	);
};
