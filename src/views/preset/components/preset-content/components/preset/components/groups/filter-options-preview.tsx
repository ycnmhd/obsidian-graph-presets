import { GroupContainer } from "../group-container/group-container";
import { TextInput } from "../inputs/text-input/text-input";
import { Toggle } from "../inputs/toggle";
import { Slider } from "../inputs/slider";
import { useAppSelector } from "src/store/hooks";

export type GroupProps = {
	created: number;
};

export const FilterOptionsPreview: React.FC<GroupProps> = ({ created }) => {
	const localJumps = useAppSelector(
		(state) => state.preset.presets[created].localJumps
	);
	const localGraph = typeof localJumps === "number";

	return (
		<GroupContainer created={created} group="filters">
			<TextInput
				type={"text"}
				props={{
					created,
					name: "search",
					placeholder: "Search",
				}}
			/>
			{localGraph && (
				<>
					<Slider name="localJumps" created={created} />
					<Toggle name="localBacklinks" created={created} />
					<Toggle name="localForelinks" created={created} />
					<Toggle name="localInterlinks" created={created} />
				</>
			)}

			<Toggle name="showTags" created={created} />
			<Toggle name="showAttachments" created={created} />
			<Toggle name="hideUnresolved" created={created} />
			{!localGraph && <Toggle name="showOrphans" created={created} />}
		</GroupContainer>
	);
};
