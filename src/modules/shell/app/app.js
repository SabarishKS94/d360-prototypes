// src/modules/shell/app/app.js
import { LightningElement, track } from 'lwc';
import _devAnnotatorToolbar from 'dev/annotatorToolbar';
import { subscribe, navigate } from '../../../router';
import { routes } from '../../../routes.config';
import { apps, getDefaultApp, getAppById, ACTIVE_APP_STORAGE_KEY } from '../../../apps.config';
import { toggleSLDS, activeSLDSVersion } from '../../../build/slds-loader';
import Home from 'page/home';
import IconTest from 'page/iconTest';
import Settings from 'page/settings';
import ChurnRateSegment from 'page/churnRateSegment';
import User from 'page/user';
import Contacts from 'page/contacts';
import ContactDetail from 'page/contactDetail';

const ROUTE_COMPONENTS = {
    'page-home': Home,
    'page-icon-test': IconTest,
    'page-settings': Settings,
    'page-churn-rate-segment': ChurnRateSegment,
    'page-user': User,
    'page-contacts': Contacts,
    'page-contact-detail': ContactDetail,
};

const ROUTE_TO_NAV_PAGE = Object.fromEntries(
    routes
        .filter((r) => r.navPage || r.navHighlight)
        .map((r) => [r.component, r.navPage ?? r.navHighlight])
);

const NAV_PAGE_TO_PATH = Object.fromEntries(
    routes.filter((r) => r.navPage).map((r) => [r.navPage, r.navPath ?? r.path])
);

const STORAGE_KEY_SLDS_VERSION = 'slds-ui-slds-version';
const STORAGE_KEY_DARK_MODE = 'slds-ui-dark-mode';

export default class App extends LightningElement {
    @track route;
    @track _sldsVersion = 2;
    @track _darkMode = false;
    @track selectedPanel = 'agentforce_panel';
    @track isPanelOpen = false;
    @track _activeAppId = getDefaultApp().id;

    get activeApp() {
        return getAppById(this._activeAppId);
    }

    get isVerticalNav() {
        return this.activeApp.navType === 'vertical';
    }

    get componentCtor() {
        const name = this.route?.component;
        return name ? ROUTE_COMPONENTS[name] ?? null : null;
    }

    get currentNavPage() {
        const name = this.route?.component;
        return name ? (ROUTE_TO_NAV_PAGE[name] ?? 'home') : 'home';
    }

    get navItems() {
        return this.activeApp.contextBarItems;
    }

    get verticalNavItems() {
        return this.activeApp.navItems;
    }

    get allApps() {
        return apps;
    }

    connectedCallback() {
        this._restorePreferences();
        this._sldsVersion = activeSLDSVersion();
        const savedAppId = localStorage.getItem(ACTIVE_APP_STORAGE_KEY);
        if (savedAppId) {
            this._activeAppId = getAppById(savedAppId).id;
        }
        this.unsubscribe = subscribe((route) => {
            this.route = route;
        });
    }

    _restorePreferences() {
        const savedVersion = localStorage.getItem(STORAGE_KEY_SLDS_VERSION);
        const savedDarkMode = localStorage.getItem(STORAGE_KEY_DARK_MODE);
        const version = savedVersion === '1' ? 1 : 2;
        if (savedDarkMode === 'true' && version === 2) {
            this._darkMode = true;
            document.body.classList.add('slds-color-scheme_dark');
        } else if (savedDarkMode === 'false') {
            this._darkMode = false;
            document.body.classList.remove('slds-color-scheme_dark');
        }
    }

    disconnectedCallback() {
        this.unsubscribe?.();
    }

    async handleToggleSLDS() {
        await toggleSLDS();
        this._sldsVersion = activeSLDSVersion();
        localStorage.setItem(STORAGE_KEY_SLDS_VERSION, String(this._sldsVersion));
        if (this._sldsVersion !== 2 && this._darkMode) {
            this._darkMode = false;
            document.body.classList.remove('slds-color-scheme_dark');
            localStorage.setItem(STORAGE_KEY_DARK_MODE, 'false');
        }
    }

    handleToggleDarkMode() {
        this._darkMode = !this._darkMode;
        document.body.classList.toggle('slds-color-scheme_dark', this._darkMode);
        localStorage.setItem(STORAGE_KEY_DARK_MODE, String(this._darkMode));
    }

    handleNavNavigate(event) {
        // vertical nav fires { path }, horizontal nav fires { page } — check path first
        const { page, path } = event.detail ?? {};
        if (path) {
            navigate(path);
        } else if (page) {
            navigate(NAV_PAGE_TO_PATH[page] ?? '/');
        }
    }

    handleAppSwitch(event) {
        const appId = event.detail?.appId;
        if (appId) {
            this._activeAppId = getAppById(appId).id;
            localStorage.setItem(ACTIVE_APP_STORAGE_KEY, this._activeAppId);
        }
    }

    handlePanelSelect(event) {
        this.selectedPanel = event.detail?.name ?? this.selectedPanel;
        this.isPanelOpen = true;
    }

    handlePanelClose() {
        this.isPanelOpen = false;
    }

    get panelClasses() {
        return `slds-panel slds-size_medium slds-panel_docked slds-panel_docked-right ${
            this.isPanelOpen ? 'slds-is-open' : ''
        }`;
    }

    handleNavigateBack() {
        history.back();
    }
}
