/**
 * Dynamically injects stylesheets to bypass Vite/LWC CSS processing.
 *
 * LWC's CSS transformer rejects selectors like :root, so any stylesheet that
 * uses them (slds-plus, SLDS itself) must be loaded at runtime via <link> tags
 * rather than through ES module imports.
 *
 * Strategy: prefer SLDS 2 (slds-plus.css). Only fall back to SLDS 1
 * (salesforce-lightning-design-system.min.css) when SLDS 2 is unavailable.
 */
export function loadSLDS() {
    const slds2Href = '/css/slds-plus.css';
    const slds1Href = '/slds/styles/salesforce-lightning-design-system.min.css';

    fetch(slds2Href, { method: 'HEAD' })
        .then((res) => {
            if (res.ok) {
                injectLink(slds2Href, 'slds-plus');
            } else {
                injectLink(slds1Href, 'salesforce-lightning-design-system');
            }
        })
        .catch(() => {
            injectLink(slds1Href, 'salesforce-lightning-design-system');
        });

    if (!document.body.classList.contains('slds-scope')) {
        document.body.classList.add('slds-scope');
    }
}

function injectLink(href, key) {
    if (!document.querySelector(`link[data-slds="${key}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.dataset.slds = key;
        document.head.appendChild(link);
    }
}
