import { LightningElement, api, track } from 'lwc';
import {
    ScopedNotificationText, ScopedNotificationLink,
    DriftTrackingTitle, DriftTrackingDescription,
    NbaTitle, NbaDescription,
    EnableButton, DisableButton, EnabledBadge,
    OrgNotEnabledMessage, OpenSetupLink,
    HeroHeadline, HeroSubtext, OrgCalloutText, OrgCalloutLinkText,
    ToastDriftEnabled, ToastDriftDisabled, ToastNbaEnabled, ToastNbaDisabled
} from 'data/labels/SettingsTab';

export default class SettingsTab extends LightningElement {
    @api orgLevelEnabled = false;

    @track driftEnabled = false;
    @track nbaEnabled = false;

    labels = {
        ScopedNotificationText, ScopedNotificationLink,
        DriftTrackingTitle, DriftTrackingDescription,
        NbaTitle, NbaDescription,
        EnableButton, DisableButton, EnabledBadge,
        OrgNotEnabledMessage, OpenSetupLink,
        HeroHeadline, HeroSubtext, OrgCalloutText, OrgCalloutLinkText
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

    handleDriftToggle() {
        if (this.orgLevelEnabled) {
            if (!this.driftEnabled) {
                this.pendingFeature = 'drift';
                this.showModal = true;
            } else {
                this.driftEnabled = false;
                this.dispatchEvent(new CustomEvent('featureenabled', {
                    detail: { featureName: 'drift', enabled: false, message: ToastDriftDisabled },
                    bubbles: true,
                    composed: true
                }));
            }
        }
    }

    handleNbaToggle() {
        if (this.orgLevelEnabled) {
            if (!this.nbaEnabled) {
                this.pendingFeature = 'nba';
                this.showModal = true;
            } else {
                this.nbaEnabled = false;
                this.dispatchEvent(new CustomEvent('featureenabled', {
                    detail: { featureName: 'nba', enabled: false, message: ToastNbaDisabled },
                    bubbles: true,
                    composed: true
                }));
            }
        }
    }

    handleModalClose() {
        this.showModal = false;
        this.pendingFeature = '';
    }

    handleModalConfirm(event) {
        this.showModal = false;
        const feature = event.detail.featureName;
        if (feature === 'drift') {
            this.driftEnabled = true;
            this.dispatchEvent(new CustomEvent('featureenabled', {
                detail: { featureName: 'drift', enabled: true, message: ToastDriftEnabled },
                bubbles: true,
                composed: true
            }));
        } else if (feature === 'nba') {
            this.nbaEnabled = true;
            this.dispatchEvent(new CustomEvent('featureenabled', {
                detail: { featureName: 'nba', enabled: true, message: ToastNbaEnabled },
                bubbles: true,
                composed: true
            }));
        }
        this.pendingFeature = '';
    }

    handleOpenSetup() {
        this.dispatchEvent(new CustomEvent('opensetup', { bubbles: true, composed: true }));
    }

    handleEnableNow() {
        this.dispatchEvent(new CustomEvent('enableorg', { bubbles: true, composed: true }));
    }
}
