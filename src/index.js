// MUST import synthetic shadow BEFORE any LWC imports
import '@lwc/synthetic-shadow';

import { createElement } from 'lwc';
import App from 'main/app';

// Create and mount the app component
try {
    const app = createElement('main-app', {
        is: App
    });
    document.querySelector('#app').appendChild(app);
} catch (err) {
    console.error('[LWC bootstrap] Failed to mount app:', err);
} finally {
    document.getElementById('app')?.classList.add('is-ready');
}

// Load icon template modules in the background. lightning-icon will request them
// on demand; this preloads so they're likely ready when the first icons render.
Promise.all([
    import('/node_modules/lightning-base-components/src/lightning/iconSvgTemplatesUtility/iconSvgTemplatesUtility.js'),
    import('/node_modules/lightning-base-components/src/lightning/iconSvgTemplatesStandard/iconSvgTemplatesStandard.js'),
    import('/node_modules/lightning-base-components/src/lightning/iconSvgTemplatesDoctype/iconSvgTemplatesDoctype.js'),
    import('/node_modules/lightning-base-components/src/lightning/iconSvgTemplatesAction/iconSvgTemplatesAction.js'),
]).catch(() => {});
