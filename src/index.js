// MUST import synthetic shadow BEFORE any LWC imports
import '@lwc/synthetic-shadow';

import { createElement } from 'lwc';
import App from 'main/app';

// Create the app component
const app = createElement('main-app', {
    is: App
});

// Mount the app to the DOM immediately (non-blocking: do not wait for icons)
document.querySelector('#app').appendChild(app);
document.getElementById('app').classList.add('is-ready');

// Load icon template modules in the background. lightning-icon will request them
// on demand; this preloads so they're likely ready when the first icons render.
Promise.all([
    import('/node_modules/lightning-base-components/src/lightning/iconSvgTemplatesUtility/iconSvgTemplatesUtility.js'),
    import('/node_modules/lightning-base-components/src/lightning/iconSvgTemplatesStandard/iconSvgTemplatesStandard.js'),
    import('/node_modules/lightning-base-components/src/lightning/iconSvgTemplatesDoctype/iconSvgTemplatesDoctype.js'),
    import('/node_modules/lightning-base-components/src/lightning/iconSvgTemplatesAction/iconSvgTemplatesAction.js'),
]).catch(() => {});