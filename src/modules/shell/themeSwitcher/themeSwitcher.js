import { LightningElement, api, track } from 'lwc';

const SHELL_OPTIONS = [
    { label: 'Standard', value: 'standard' },
    { label: 'Glass', value: 'cosmos' },
];

const SHELL_STORAGE_KEY = 'shell-mode';

export default class ThemeSwitcher extends LightningElement {
    @api activeTheme = 'light';
    @track isCardOpen = false;

    get shellOptions() {
        return SHELL_OPTIONS;
    }

    // Derive active shell from the theme value
    get activeShell() {
        return this.activeTheme?.startsWith('cosmos') ? 'cosmos' : 'standard';
    }

    // Derive dark mode state from the theme value
    get isDark() {
        return this.activeTheme === 'dark' || this.activeTheme === 'cosmos-dark';
    }

    handleIconClick() {
        this.isCardOpen = !this.isCardOpen;
    }

    handleBackdropClick() {
        this.isCardOpen = false;
    }

    handleShellChange(event) {
        const newShell = event.detail.value;
        if (newShell === this.activeShell) return;

        // Persist shell choice and reload — shell is selected at boot time in index.js
        localStorage.setItem(SHELL_STORAGE_KEY, newShell);

        // Carry over current dark mode preference to the new shell
        const theme = newShell === 'cosmos'
            ? (this.isDark ? 'cosmos-dark' : 'cosmos-light')
            : (this.isDark ? 'dark' : 'light');
        localStorage.setItem('slds-ui-theme', theme);

        const url = new URL(window.location);
        url.searchParams.delete('shell');
        window.location.href = url.toString();
    }

    handleDarkToggle(event) {
        const dark = event.target.checked;
        const theme = this.activeShell === 'cosmos'
            ? (dark ? 'cosmos-dark' : 'cosmos-light')
            : (dark ? 'dark' : 'light');

        this.dispatchEvent(new CustomEvent('applytheme', {
            bubbles: true,
            composed: true,
            detail: { theme }
        }));
    }
}
