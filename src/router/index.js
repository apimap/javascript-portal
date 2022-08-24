import Vue from "vue";
import Router from "vue-router";

import {Paths} from "./paths";

//
const Startpage = () => import("@/pages/Startpage/Startpage");

// Search
const SearchResults = () => import("@/pages/Search/SearchResults");

// Api
const Api = () => import("@/pages/Api/Api");

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: Paths.root.url,
            name: Paths.root.name,
            component: Startpage,
            meta: {
                breadcrumb: [
                    {name: Paths.root.name}
                ],
            },
        },
        {
            path: Paths.search.url,
            name: Paths.search.name,
            component: SearchResults,
            meta: {
                breadcrumb: [
                    {name: Paths.root.name, link: Paths.root.url},
                    {name: Paths.search.name}
                ],
            },
            children: [
                {
                    path: Paths.api.url,
                    name: Paths.api.name,
                    component: Api,
                    meta: {
                        breadcrumb: [
                            {name: Paths.root.name, link: "/"},
                            {name: Paths.search.name }
                        ],
                    },
                    children: [
                        {
                            path: Paths.apiVersion.url,
                            name: Paths.apiVersion.name,
                            component: Api,
                            meta: {
                                breadcrumb: [
                                    {name: Paths.root.name, link: "/"},
                                    {name: Paths.search.name }
                                ],
                            },
                            children: [
                                {
                                    path: Paths.apiMetadata.url,
                                    name: Paths.apiMetadata.name,
                                    component: Api,
                                    meta: {
                                        breadcrumb: [
                                            {name: Paths.root.name, link: "/"},
                                            {name: Paths.search.name }
                                        ],
                                    },
                                }
                            ]
                        }
                    ]
                },
            ]
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
            return {x: 0, y: 0}
        }
    },
});