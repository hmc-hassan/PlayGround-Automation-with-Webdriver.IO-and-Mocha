const { browser } = require('@wdio/globals')
const { config } = require('../../wdio.conf');

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param config.baseUrl path of the base URL imported from (../../wdio.conf)
    */
    open () {
        return browser.url(config.baseUrl)
    }
}
