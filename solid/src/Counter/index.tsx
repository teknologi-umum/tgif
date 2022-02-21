import style from "./style.module.css";

import { counter } from "host/counterStore";
import { createSignal, onMount } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(counter.getState().count);
  counter.subscribe(({ count }) => setCount(count));

  return (
    <div class={style.box}>
      <h1 class={style.title}>Solid Child</h1>
      <span class={style.counter}>{count()}</span>
    </div>
  );
}
