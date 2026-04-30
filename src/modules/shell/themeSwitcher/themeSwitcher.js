import { LightningElement, api, track } from 'lwc';

const COSMOS_OPTIONS = [
    { label: 'Light', value: 'cosmos-light' },
    { label: 'Dark', value: 'cosmos-dark' }
];

const STANDARD_OPTIONS = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' }
];

export default class ThemeSwitcher extends LightningElement {
    @api activeTheme = 'light';
    @track isCardOpen = false;

    get themeOptions() {
        return this.activeTheme?.startsWith('cosmos') ? COSMOS_OPTIONS : STANDARD_OPTIONS;
    }

    handleIconClick() {
        this.isCardOpen = !this.isCardOpen;
    }

    handleBackdropClick() {
        this.isCardOpen = false;
    }

    handleThemeChange(event) {
        this.dispatchEvent(
            new CustomEvent('applytheme', {
                bubbles: true,
                composed: true,
                detail: { theme: event.detail.value }
            })
        );
    }
}
