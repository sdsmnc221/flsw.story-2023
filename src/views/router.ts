import { createMemoryHistory, createRouter } from "vue-router";

import Prologue from "./prologue.vue";
import Chapter1 from "./chapter-1.vue";
import Chapter2 from "./chapter-2.vue";
import Chapter3 from "./chapter-3.vue";
import Chapter4 from "./chapter-4.vue";
import Chapter5 from "./chapter-5.vue";
import Chapter6 from "./chapter-6.vue";
import Chapter7 from "./chapter-7.vue";
import Chapter8 from "./chapter-8.vue";
import Epilogue1 from "./epilogue-1.vue";
import Epilogue2 from "./epilogue-2.vue";
import Epilogue3 from "./epilogue-3.vue";

const routes = [
  { path: "/", component: Prologue },
  { path: "/c1", component: Chapter1 },
  { path: "/c2", component: Chapter2 },
  { path: "/c3", component: Chapter3 },
  { path: "/c4", component: Chapter4 },
  { path: "/c5", component: Chapter5 },
  { path: "/c6", component: Chapter6 },
  { path: "/c7", component: Chapter7 },
  { path: "/c8", component: Chapter8 },
  { path: "/end-1", component: Epilogue1 },
  { path: "/end-2", component: Epilogue2 },
  { path: "/end-3", component: Epilogue3 },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
