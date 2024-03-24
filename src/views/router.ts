import { createMemoryHistory, createRouter } from "vue-router";

import Prologue from "./prologue.vue";
import Chapter1 from "./chapter-1.vue";

const routes = [
  { path: "/", component: Prologue },
  { path: "/c1", component: Chapter1 },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
