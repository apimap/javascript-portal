import Vue from "vue";
import Router from "vue-router";

import { Paths } from "./paths";

//
const Startpage = () => import("@/views/Startpage");

// Search
const Search = () => import("@/views/Search");

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: Paths.root.url,
            name: Paths.root.name,
            component: Startpage,
            meta: {
                breadcrumb: [{ name: Paths.root.name }],
            },
        },
        {
            path: Paths.search.url,
            name: Paths.search.name,
            component: Search,
            meta: {
                breadcrumb: [
                    { name: Paths.root.name, link: Paths.root.url },
                    { name: Paths.search.name },
                ],
            },
        },
        {
            path: "*",
            redirect: Paths.root.url,
        }
  ],
  scrollBehavior: function (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return {x:0, y:0}
    }
  },
});