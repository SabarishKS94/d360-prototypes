import { LightningElement, api, track } from 'lwc';
import {
    DriftTitle, NbaTitle, BodyText, CheckboxLabel,
    CancelButton, EnableButton, CloseAltText
} from 'data/labels/EnableModal';

export default class EnableModal extends LightningElement {
    @api featureName = '';
    @api visible = false;

    @track agreed = false;

    labels = { BodyText, CheckboxLabel, CancelButton, EnableButton, CloseAltText };

    get modalTitle() {
        return this.featureName === 'drift' ? DriftTitle : NbaTitle;
    }

    get isEnableDisabled() {
        return !this.agreed;
    }

    handleCheckboxChange(event) {
        this.agreed = event.target.checked;
    }

    handleCancel() {
        this.agreed = false;
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleClose() {
        this.agreed = false;
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleEnable() {
        this.agreed = false;
        this.dispatchEvent(new CustomEvent('confirm', {
            detail: { featureName: this.featureName }
        }));
    }
}
