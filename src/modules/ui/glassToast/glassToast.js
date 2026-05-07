import { LightningElement, api } from 'lwc';

export default class GlassToast extends LightningElement {
    @api variant = 'default';
    @api message = '';
    @api iconName = '';

    get toastClasses() {
        return `glass-toast glass-toast-${this.variant}`;
    }

    get iconClasses() {
        return `toast-icon toast-icon-${this.variant}`;
    }

    get hasIcon() {
        return !!this.iconName;
    }

    handleClose() {
        this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    }
}
