/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useLayoutEffect, useReducer } from "react";
import { ColorGroup } from "src/types/graph-settings";

type State = {
	groups: ColorGroup[];
};

type Action =
	| {
			type: "update-color";
			payload: {
				rgb: number;
				currentIndex: number;
			};
	  }
	| {
			type: "update-query";
			payload: {
				currentIndex: number;
				newQuery: string;
			};
	  }
	| {
			type: "update-all";
			payload: {
				groups: ColorGroup[];
			};
	  }
	| {
			type: "add-group";
	  }
	| {
			type: "remove-group";
			payload: {
				currentIndex: number;
			};
	  };
const colorGroupsReducer =
	(onChange: OnChange) => (state: State, action: Action) => {
		switch (action.type) {
			case "update-color": {
				const newState: State = {
					...state,
					groups: state.groups.map((group, i) =>
						i === action.payload.currentIndex
							? {
									...group,
									color: {
										...group.color,
										rgb: action.payload.rgb,
									},
							  }
							: group
					),
				};
				onChange(newState.groups);
				return newState;
			}
			case "update-query": {
				const newState: State = {
					...state,
					groups: state.groups.map((group, i) =>
						i === action.payload.currentIndex
							? {
									...group,
									query: action.payload.newQuery,
							  }
							: group
					),
				};
				onChange(newState.groups);
				return newState;
			}
			case "update-all":
				return {
					...state,
					groups: action.payload.groups,
				};
			case "add-group":
				return {
					...state,
					groups: [
						...state.groups,
						{
							query: "",
							color: {
								rgb: 0,
								a: 1,
							},
						} as ColorGroup,
					],
				};
			case "remove-group": {
				const newState: State = {
					...state,
					groups: state.groups.filter(
						(group, i) => i !== action.payload.currentIndex
					),
				};
				onChange(newState.groups);
				return newState;
			}

			default:
				return state;
		}
	};
type OnChange = (groups: ColorGroup[]) => void;

export const useColorGroups = (groups: ColorGroup[], onChange: OnChange) => {
	const reducer = useCallback(colorGroupsReducer(onChange), [onChange]);
	const [state, dispatch] = useReducer(reducer, {
		groups: [],
	});

	const updateColor = useCallback((currentIndex: number, rgb: number) => {
		dispatch({
			type: "update-color",
			payload: {
				currentIndex,
				rgb,
			},
		});
	}, []);

	const updateQuery = useCallback(
		(currentIndex: number, newQuery: string) => {
			dispatch({
				type: "update-query",
				payload: {
					currentIndex,
					newQuery,
				},
			});
		},
		[]
	);

	const addGroup = useCallback(() => {
		dispatch({
			type: "add-group",
		});
	}, []);

	const removeGroup = useCallback((currentIndex: number) => {
		dispatch({
			type: "remove-group",
			payload: {
				currentIndex,
			},
		});
	}, []);

	useLayoutEffect(() => {
		if (!groups.length) return;
		dispatch({
			type: "update-all",
			payload: {
				groups: Object.values(groups),
			},
		});
	}, [groups]);

	return {
		state,
		updateColor,
		updateQuery,
		addGroup,
		removeGroup,
	};
};
