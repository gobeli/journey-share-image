export const DebouncerTimeout = () => {
	let _debounceMillisecond = 300;
	let lastCallbackTime = 0;
	let timeout: number;

	return {
		debounce: (callback: () => void) => {
			if (lastCallbackTime > Date.now() - _debounceMillisecond)
				clearTimeout(timeout);
			timeout = setTimeout(callback, _debounceMillisecond);
			lastCallbackTime = Date.now();
			return timeout;
		},
	};
};