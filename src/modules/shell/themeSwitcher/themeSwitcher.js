import { LightningElement, api, track } from 'lwc';

const THEME_OPTIONS = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Cosmos Light', value: 'cosmos-light' },
    { label: 'Cosmos Dark', value: 'cosmos-dark' }
];

export default class ThemeSwitcher extends LightningElement {
    @api activeTheme = 'light';
    @track isCardOpen = false;

    get themeOptions() {
        return THEME_OPTIONS;
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
