const baseURL = 'https://www.linkedin.com/search/results/people/';
const regionId = 91;

console.log("start of the script");
let title;

if (document.getElementsByClassName("biz-page-title")[0] !== undefined) {
    title = document.getElementsByClassName("biz-page-title")[0].innerText;
}

let mapbox = document.getElementsByClassName("mapbox-text")[0];
let ul;
if (mapbox !== undefined) {
    console.log("mapbox is not undefined");
    ul = mapbox.getElementsByTagName("ul")[0];
}

if (ul) {
    let li = document.createElement("li");

    let linkedInURL = baseURL + '?' + `facetGeoRegion=%5B&quot;us%3A${regionId}&quot;%5D` + '&' + 'keywords=' + encodeURI(title);
    li.innerHTML = (
      `<span aria-hidden="true" style="width: 18px; height: 18px;" class="icon icon--18-external-link icon--size-18">` +
          `<svg class="icon_svg"><use xlink:href="#18x18_external_link"></use> </svg>` +
          `</span> <span class="biz-website js-biz-website js-add-url-tagging">` +
          `<span class="offscreen">LinkedIn Search</span>` +
          `<a href="${linkedInURL}" target="_blank" rel="noopener">Search on LinkedIn</a>` +
      `</span>`);

    ul.appendChild(li);
}
