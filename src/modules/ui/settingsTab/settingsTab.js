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

    get driftButtonLabel() {
        return this.driftEnabled ? DisableButton : EnableButton;
    }

    get driftButtonVariant() {
        return this.driftEnabled ? 'destructive-text' : 'brand-outline';
    }

    get nbaButtonLabel() {
        return this.nbaEnabled ? DisableButton : EnableButton;
    }

    get nbaButtonVariant() {
        return this.nbaEnabled ? 'destructive-text' : 'brand-outline';
    }

    get isDriftDisabled() {
        return !this.orgLevelEnabled;
    }

    get isNbaDisabled() {
        return !this.orgLevelEnabled;
    }

    handleDriftToggle() {
        if (this.orgLevelEnabled) {
            this.driftEnabled = !this.driftEnabled;
            const message = this.driftEnabled ? ToastDriftEnabled : ToastDriftDisabled;
            this.dispatchEvent(new CustomEvent('featureenabled', {
                detail: { featureName: 'drift', enabled: this.driftEnabled, message },
                bubbles: true,
                composed: true
            }));
        }
    }

    handleNbaToggle() {
        if (this.orgLevelEnabled) {
            this.nbaEnabled = !this.nbaEnabled;
            const message = this.nbaEnabled ? ToastNbaEnabled : ToastNbaDisabled;
            this.dispatchEvent(new CustomEvent('featureenabled', {
                detail: { featureName: 'nba', enabled: this.nbaEnabled, message },
                bubbles: true,
                composed: true
            }));
        }
    }

    handleOpenSetup() {
        this.dispatchEvent(new CustomEvent('opensetup', { bubbles: true, composed: true }));
    }

    handleEnableNow() {
        this.dispatchEvent(new CustomEvent('enableorg', { bubbles: true, composed: true }));
    }
}
