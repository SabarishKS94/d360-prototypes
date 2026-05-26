import LightningModal from 'lightning/modal';
import { Cancel, Confirm } from 'data/labels/Common';

/**
 * Demo modal component that extends LightningModal.
 * Opened imperatively via DemoModal.open({ label: '...', size: 'medium' }).
 * Use for demonstrating modal header, body, and footer with Lightning Base Components.
 */
export default class DemoModal extends LightningModal {
    labels = { Cancel, Confirm };
    handleCancel() {
        this.close();
    }

    handleConfirm() {
        this.close('confirmed');
    }
}
