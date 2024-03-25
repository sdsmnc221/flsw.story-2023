import { createMemoryHistory, createRouter } from "vue-router";

import Prologue from "./prologue.vue";
import Chapter1 from "./chapter-1.vue";
import Chapter2 from "./chapter-2.vue";

const routes = [
  { path: "/", component: Prologue },
  { path: "/c1", component: Chapter1 },
  { path: "/c2", component: Chapter2 },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
