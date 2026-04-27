import { LightningElement, api, track } from 'lwc';

export default class ThemeSwitcher extends LightningElement {
    @api darkMode = false;
    @api cosmosTheme = '';
    @track isCardOpen = false;

    get darkModeLabel() {
        return this.darkMode ? 'Light Mode' : 'Dark Mode';
    }

    get cosmosLightVariant() {
        return this.cosmosTheme === 'cosmos-light' ? 'brand' : 'neutral';
    }

    get cosmosDarkVariant() {
        return this.cosmosTheme === 'cosmos-dark' ? 'brand' : 'neutral';
    }

    handleIconClick() {
        this.isCardOpen = !this.isCardOpen;
    }

    handleBackdropClick() {
        this.isCardOpen = false;
    }

    handleToggleDarkModeClick() {
        this.dispatchEvent(
            new CustomEvent('toggledarkmode', { bubbles: true, composed: true })
        );
    }

    handleCosmosLightClick() {
        this.dispatchEvent(
            new CustomEvent('setcosmostheme', {
                bubbles: true,
                composed: true,
                detail: { theme: 'cosmos-light' }
            })
        );
    }

    handleCosmosDarkClick() {
        this.dispatchEvent(
            new CustomEvent('setcosmostheme', {
                bubbles: true,
                composed: true,
                detail: { theme: 'cosmos-dark' }
            })
        );
    }
}
