import { LightningElement, api, track } from 'lwc';
import {
    ScopedNotificationText, ScopedNotificationLink,
    DriftTrackingTitle, DriftTrackingDescription,
    NbaTitle, NbaDescription,
    EnableButton, DisableButton, EnabledBadge,
    OrgNotEnabledMessage, OpenSetupLink
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
        OrgNotEnabledMessage, OpenSetupLink
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
        }
    }

    handleNbaToggle() {
        if (this.orgLevelEnabled) {
            this.nbaEnabled = !this.nbaEnabled;
        }
    }

    handleOpenSetup() {
        this.dispatchEvent(new CustomEvent('opensetup', { bubbles: true, composed: true }));
    }

    handleEnableNow() {
        this.dispatchEvent(new CustomEvent('enableorg', { bubbles: true, composed: true }));
    }
}
