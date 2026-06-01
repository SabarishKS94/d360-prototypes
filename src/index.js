// MUST import synthetic shadow BEFORE any LWC imports
import '@lwc/synthetic-shadow';

import { createElement } from 'lwc';
import App from 'shell/app';
import CosmosApp from 'shell/cosmosApp';
import { initSldsFromStorage } from './build/slds-loader.js';

await initSldsFromStorage();

// Inject global stylesheet after SLDS using new URL() to bypass LWC plugin.
const globalCssUrl = new URL('./styles/global.css', import.meta.url).href;
const globalLink = document.createElement('link');
globalLink.rel = 'stylesheet';
globalLink.href = globalCssUrl;
document.head.appendChild(globalLink);

const SHELL_STORAGE_KEY = 'shell-mode';
const params = new URLSearchParams(window.location.search);
const shellParam = params.get('shell');
if (shellParam) {
    localStorage.setItem(SHELL_STORAGE_KEY, shellParam);
}
const shellMode = localStorage.getItem(SHELL_STORAGE_KEY) || 'standard';
const isCosmos = shellMode === 'cosmos';

try {
    const app = createElement(isCosmos ? 'shell-cosmos-app' : 'shell-app', {
        is: isCosmos ? CosmosApp : App
    });
    document.querySelector('#app').appendChild(app);
} catch (err) {
    console.error('[LWC bootstrap] Failed to mount app:', err);
} finally {
    document.getElementById('app')?.classList.add('is-ready');
}
