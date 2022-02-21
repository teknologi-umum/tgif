import { render } from "solid-js/web";
import Counter from "./index";

export default function counterWrapper(el: HTMLElement) {
  render(Counter, el);
}
