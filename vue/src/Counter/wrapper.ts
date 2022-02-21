import { createApp } from "vue";

import Counter from "./index.vue";

export default function counterWrapper(el: Element) {
  createApp(Counter).mount(el);
}
