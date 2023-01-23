import { SpaNavigator } from "~/service/SpaNavigator";

const navigator = new SpaNavigator();

window.navigation.addEventListener("navigate", (navigateEvent) => navigator.handle(navigateEvent));
