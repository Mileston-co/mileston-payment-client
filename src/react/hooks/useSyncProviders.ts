import { useSyncExternalStore } from "react";
import { store } from "../components/lib/store";

export const useSyncProviders = ()=> useSyncExternalStore(store.subscribe, store.value, store.value)