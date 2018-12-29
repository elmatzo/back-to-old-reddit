const requestType = 'main_frame'
const requestMethod = 'GET'
const baseUrl = 'reddit.com/'
const redirectBase = 'https://old.reddit.com/'

const isMainFrameRequest = request => {
    return request.type === requestType &&
        request.method === requestMethod
}

const callback = request => {
    if (isMainFrameRequest(request)) {
        const requestParts = request.url.split(baseUrl)
        return {
            redirectUrl: redirectBase + requestParts[1]
        }
    }
}

const filter = {
    urls: [
        '*://reddit.com/*',
        '*://www.reddit.com/*',
    ]
}

const opt_extraInfoSpec = ['blocking']

chrome.webRequest.onBeforeRequest.addListener(
  callback, filter, opt_extraInfoSpec
)