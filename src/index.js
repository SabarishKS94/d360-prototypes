// MUST import synthetic shadow BEFORE any LWC imports
import '@lwc/synthetic-shadow';

// Pre-load icon template modules so they're in the module registry before any
// component mounts. This eliminates the async gap in primitiveIcon's
// requestIconTemplates() — hasIconLibrary() returns true on first render.
import '/node_modules/lightning-base-components/src/lightning/iconSvgTemplatesUtility/iconSvgTemplatesUtility.js';
import '/node_modules/lightning-base-components/src/lightning/iconSvgTemplatesStandard/iconSvgTemplatesStandard.js';
import '/node_modules/lightning-base-components/src/lightning/iconSvgTemplatesDoctype/iconSvgTemplatesDoctype.js';
import '/node_modules/lightning-base-components/src/lightning/iconSvgTemplatesAction/iconSvgTemplatesAction.js';

import { createElement } from 'lwc';
import App from 'demo/app';

// Create the app component
const app = createElement('demo-app', {
    is: App
});

// Mount the app to the DOM
document.querySelector('#app').appendChild(app);

document.getElementById('app').classList.add('is-ready');