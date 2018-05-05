
const regionId = 91;

class BizObject {
    constructor(biz) {
        this.biz = biz;
        this.regionId = regionId;
    }

    // getter
    get url() {
        return this.biz.getElementsByClassName("biz-name")[0].href;
    }

    // getter
    get title() {
        return this.biz.getElementsByClassName("biz-name")[0].innerText;
    }

    // getter
    get linkedInUrl() {
        return this.getlinkedInUrl()
    }
    // method
    openURL(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr);
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    }
    // method
    getlinkedInUrl() {
        let url = new URL('https://www.linkedin.com/search/results/people/');
        url.searchParams.append('facetGeoRegion', '["us:' + this.regionId + '"]');
        url.searchParams.append('keywords', this.title);
        return url;
    }

    // method
    setlinkedInUrl() {
        let span = document.createElement("span");
        span.innerHTML = (
            `<span class="biz-website js-biz-website js-add-url-tagging">` +
                `<span class="offscreen">LinkedIn Search</span>` +
                `<a href="${this.linkedInUrl}" target="_blank" rel="noopener">LinkedIn</a>` +
            `</span>`
        );
        this.appendSpan(span);
    }
    // method
    setWebsiteWithRedirect(response) {
        let redirectDoc = document.implementation.createHTMLDocument("tmpRedirect");
        redirectDoc.documentElement.innerHTML = response.responseText;
        let container = redirectDoc.getElementsByClassName("y-container_content")[0];
        let url = container.getElementsByTagName("a")[0].href;
        this.openURL(url, (response) => {
            this.setWebsite(response);
        })
    }
    // method
    setWebsite(response) {

        let doc = document.implementation.createHTMLDocument("tmp");
        doc.documentElement.innerHTML = response.responseText;
        let bizWebsite = doc.getElementsByClassName("biz-website")[0];
        if (bizWebsite !== undefined) {
            let websiteURL = new URL(bizWebsite.getElementsByTagName("a")[0].href);
            let website = new URL(websiteURL.searchParams.get("url"));
            let span = document.createElement("span");
            span.innerHTML = (
              `<span class="biz-website js-biz-website js-add-url-tagging">` +
                  `<span class="offscreen">${website.host}</span>` +
                  `<a href="${website}" target="_blank" rel="noopener">${website.host}</a>` +
              `</span>`
            );
            this.appendSpan(span);
        };
    }

    // method
    appendSpan(span) {
        span.className = "neighborhood-str-list";
        let secondaryAttributes = this.biz.getElementsByClassName("secondary-attributes")[0];
        secondaryAttributes.appendChild(span);
    }
}

let bizs = document.getElementsByClassName("biz-attributes");
for (let i in bizs) {
    updateBiz(bizs[i]);
}

function updateBiz(biz) {
    let bizObject = new BizObject(biz);
    if (bizObject.url.startsWith("https://www.yelp.com/adredir?")) {
        bizObject.openURL(bizObject.url, (response) => {bizObject.setWebsiteWithRedirect(response)});
    } else {
        bizObject.openURL(bizObject.url, (response) => {bizObject.setWebsite(response)});
    }
    bizObject.setlinkedInUrl();
}
