type Props = {
	error: Error;
	resetErrorBoundary: () => void;
};

export const ErrorFallback: React.FC<Props> = ({
	error,
	resetErrorBoundary,
}) => {
	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<span>{error.message}</span>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	);
};
