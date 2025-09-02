// Builds and appends Developers Breadcrumb's HTML
function developerBreadcrumbsInit(breadcrumbsElem) {
    setTimeout(() => {
        const defaultLang = document.querySelector("html").getAttribute("lang") ? document.querySelector("html").getAttribute("lang").replace("_", "-") : "en";

        const { appleURL, developerURL } = createLocalizedAppleWebsiteLinks(defaultLang);

        let nav = document.createElement("nav");
        nav.classList.add("footer-breadcrumbs");
        nav.setAttribute("aria-label", "Breadcrumbs");

        let appleLink = document.createElement("a");
        appleLink.setAttribute("href", appleURL);
        appleLink.classList = "home footer-breadcrumbs-home";

        let spanIcon = document.createElement("span");
        spanIcon.classList.add("footer-breadcrumbs-home-icon");
        spanIcon.setAttribute("aria-hidden", true);
        spanIcon.setAttribute("data-hires-status", "pending");
        spanIcon.textContent = "";

        let spanLabel = document.createElement("span");
        spanLabel.classList.add("footer-breadcrumbs-home-label");
        spanLabel.textContent = "Apple";

        let divPath = document.createElement("div");
        divPath.classList.add("footer-breadcrumbs-path");

        let ol = document.createElement("ol");
        ol.classList.add("footer-breadcrumbs-list");

        let li = document.createElement("li");

        let developerLink = document.createElement("a");
        developerLink.setAttribute("href", developerURL);
        developerLink.textContent = "Developer";

        appleLink.appendChild(spanIcon);
        appleLink.appendChild(spanLabel);

        li.appendChild(developerLink);

        const templateContent = breadcrumbsElem.children;

        ol.appendChild(li);
        ol.append(...templateContent);

        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].classList = "footer-breadcrumbs-item";
        }

        divPath.appendChild(ol);

        nav.appendChild(appleLink);
        nav.appendChild(divPath);

        breadcrumbsElem.style.display = "block";

        breadcrumbsElem.appendChild(nav);

        //Listens for changes to HTML lang attribute on single page apps
        const developerBreadcrumbsObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === "attributes" && mutation.attributeName === "lang") {
                    const updatedLang = document.querySelector("html").getAttribute("lang") ? document.querySelector("html").getAttribute("lang").replace("_", "-") : "en";
                    const { appleURL, developerURL } = createLocalizedAppleWebsiteLinks(updatedLang);
                    appleLink.setAttribute("href", appleURL);
                    developerLink.setAttribute("href", developerURL);
                }
            });
        });

        developerBreadcrumbsObserver.observe(document.querySelector("HTML"), {
            attributes: true,
        });
    });
}

class DeveloperBreadcrumbs extends HTMLElement {
    connectedCallback() {
        if (window.angular) {
            setTimeout(developerBreadcrumbsInit.bind(null, this));
        } else {
            developerBreadcrumbsInit(this);
        }
    }
}

customElements.define("developer-breadcrumbs", DeveloperBreadcrumbs);

function createLocalizedAppleWebsiteLinks(language) {
    let appleURL, developerURL;

    switch (language) {
        case "zh-CN":
            appleURL = "https://www.apple.com.cn/";
            developerURL = "/cn/";
            return { appleURL, developerURL };
        case "ja-JP":
            appleURL = "https://www.apple.com/jp/";
            developerURL = "/jp/";
            return { appleURL, developerURL };
        case "ko-KR":
            appleURL = "https://www.apple.com/kr/";
            developerURL = "/kr/";
            return { appleURL, developerURL };
        case "de-DE":
            appleURL = "https://www.apple.com/de/";
            developerURL = "/";
            return { appleURL, developerURL };
        case "es-lamr":
            appleURL = "https://www.apple.com/es/";
            developerURL = "/";
            return { appleURL, developerURL };
        case "fr-FR":
            appleURL = "https://www.apple.com/fr/";
            developerURL = "/";
            return { appleURL, developerURL };
        case "it-IT":
            appleURL = "https://www.apple.com/it/";
            developerURL = "/";
            return { appleURL, developerURL };
        case "pt-BR":
            appleURL = "https://www.apple.com/pt/";
            developerURL = "/";
            return { appleURL, developerURL };
        default:
            appleURL = "https://www.apple.com/";
            developerURL = "/";
            return { appleURL, developerURL };
    }
}
