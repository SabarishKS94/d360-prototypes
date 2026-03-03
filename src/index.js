// MUST import synthetic shadow BEFORE any LWC imports
import '@lwc/synthetic-shadow';

import { createElement } from 'lwc';
import App from 'demo/app';
import { loadSLDS } from './slds-loader';

// Load SLDS dynamically — prefers SLDS 2 (slds-plus.css), falls back to SLDS 1
loadSLDS();

// Verify synthetic shadow is active
console.log('LWC Synthetic Shadow Active:', typeof window.SyntheticShadowRoot !== 'undefined');

// Create the app component
const app = createElement('demo-app', {
    is: App
});

// Mount the app to the DOM
document.querySelector('#app').appendChild(app);

// Additional verification after mount
setTimeout(() => {
    const appEl = document.querySelector('demo-app');
    if (appEl) {
        console.log('App element shadowRoot:', appEl.shadowRoot);
        console.log('Can query inside app:', document.querySelectorAll('demo-app .slds-section').length > 0);
    }
}, 1000);