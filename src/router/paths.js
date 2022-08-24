export const Paths = {
	root: {
		url: "/",
		name: "Home"
	},
	search: {
		url:  "/api",
		name: "Search Results"
	},
	api: {
		url:  "/api/:api",
		name: "Api"
	},
	apiVersion: {
		url:  "/api/:api/version/:version",
		name: "Api Version"
	},
	apiMetadata: {
		url:  "/api/:api/version/:version/page/:page",
		name: "Api Version Page"
	}
}
