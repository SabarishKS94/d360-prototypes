import { LightningElement, api, track } from 'lwc';
import {
    ScopedNotificationText, ScopedNotificationLink,
    DriftTrackingTitle, DriftTrackingDescription,
    NbaTitle, NbaDescription,
    EnableButton, DisableButton, EnabledBadge,
    OrgNotEnabledMessage, OpenSetupLink,
    HeroHeadline, HeroSubtext, OrgCalloutText, OrgCalloutLinkText,
    PreviewTitle, DriftPreviewText, NbaPreviewText,
    ToastDriftEnabled, ToastDriftDisabled, ToastNbaEnabled, ToastNbaDisabled
} from 'data/labels/SettingsTab';

export default class SettingsTab extends LightningElement {
    @api orgLevelEnabled = false;
    @api showPreview = false;

    @track driftEnabled = false;
    @track nbaEnabled = false;

    labels = {
        ScopedNotificationText, ScopedNotificationLink,
        DriftTrackingTitle, DriftTrackingDescription,
        NbaTitle, NbaDescription,
        EnableButton, DisableButton, EnabledBadge,
        OrgNotEnabledMessage, OpenSetupLink,
        HeroHeadline, HeroSubtext, OrgCalloutText, OrgCalloutLinkText,
        PreviewTitle, DriftPreviewText, NbaPreviewText
    };

    get showOrgNotification() {
        return !this.orgLevelEnabled;
    }

    get driftButtonClass() {
        return this.driftEnabled ? 'feature-toggle-btn feature-toggle-btn_enabled' : 'feature-toggle-btn';
    }

    get nbaButtonClass() {
        return this.nbaEnabled ? 'feature-toggle-btn feature-toggle-btn_enabled' : 'feature-toggle-btn';
    }

    get isDriftDisabled() {
        return !this.orgLevelEnabled;
    }

    get isNbaDisabled() {
        return !this.orgLevelEnabled;
    }

    @track showModal = false;
    @track pendingFeature = '';
    @track isDisabling = false;

    handleDriftToggle() {
        if (this.orgLevelEnabled) {
            this.pendingFeature = 'drift';
            this.isDisabling = this.driftEnabled;
            this.showModal = true;
        }
    }

    handleNbaToggle() {
        if (this.orgLevelEnabled) {
            this.pendingFeature = 'nba';
            this.isDisabling = this.nbaEnabled;
            this.showModal = true;
        }
    }

    handleModalClose() {
        this.showModal = false;
        this.pendingFeature = '';
        this.isDisabling = false;
    }

    handleModalConfirm(event) {
        this.showModal = false;
        const feature = event.detail.featureName;
        const wasDisabling = event.detail.isDisabling;

        if (feature === 'drift') {
            this.driftEnabled = !wasDisabling;
            const message = this.driftEnabled ? ToastDriftEnabled : ToastDriftDisabled;
            this.dispatchEvent(new CustomEvent('featureenabled', {
                detail: { featureName: 'drift', enabled: this.driftEnabled, message },
                bubbles: true,
                composed: true
            }));
        } else if (feature === 'nba') {
            this.nbaEnabled = !wasDisabling;
            const message = this.nbaEnabled ? ToastNbaEnabled : ToastNbaDisabled;
            this.dispatchEvent(new CustomEvent('featureenabled', {
                detail: { featureName: 'nba', enabled: this.nbaEnabled, message },
                bubbles: true,
                composed: true
            }));
        }
        this.pendingFeature = '';
        this.isDisabling = false;
    }

    handleOpenSetup() {
        this.dispatchEvent(new CustomEvent('opensetup', { bubbles: true, composed: true }));
    }

    handleEnableNow() {
        this.dispatchEvent(new CustomEvent('navigate', {
            detail: { route: '/aim-feature-manager' },
            bubbles: true,
            composed: true
        }));
    }
}
