process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_CREATED = new Date().toLocaleString('en-GB', { timeZone: 'UTC' })

module.exports = {
    configureWebpack: {
        resolve: {
            fallback: {
                "vm": require.resolve("vm-browserify")
            }
        }
    }
}