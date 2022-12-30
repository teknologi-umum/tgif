import "./Counter.scss";
import { createSignal } from "solid-js";
import LeftArrowIcon from "~icons/fluent/arrow-left-12-regular";
import RightArrowIcon from "~icons/fluent/arrow-right-12-regular";

export function Counter() {
	const [count, setCount] = createSignal(0);

	function decrement() {
		setCount((prev) => prev - 1);
	}

	function increment() {
		setCount((prev) => prev + 1);
	}

	return (
		<div class="counter">
			<button class="counter__button" onClick={decrement}>
				<LeftArrowIcon />
			</button>
			<span class="counter__text">{count()}</span>
			<button class="counter__button" onClick={increment}>
				<RightArrowIcon />
			</button>
		</div>
	);
}
