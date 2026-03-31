import { LightningElement, api } from 'lwc';

export default class GlobalShell extends LightningElement {
    @api currentPage = 'home';
    @api navItems = [];
    @api user;

    handleNavigate(event) {
        event.stopPropagation();
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: event.detail,
                bubbles: true,
                composed: true
            })
        );
    }

    handlePanelSelect(event) {
        this.dispatchEvent(
            new CustomEvent('panelselect', {
                detail: event.detail,
                bubbles: true,
                composed: true
            })
        );
    }
}
