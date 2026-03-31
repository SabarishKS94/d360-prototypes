import { LightningElement, api, track } from 'lwc';
import { signOut } from '../../../data/firebaseAuth.js';

export default class UserMenu extends LightningElement {
    @api user;
    @track _isOpen = false;

    _handleOutsideClick = (event) => {
        const trigger = this.template.querySelector('.user-menu-trigger');
        if (trigger && !trigger.contains(event.target)) {
            this._isOpen = false;
        }
    };

    connectedCallback() {
        document.addEventListener('click', this._handleOutsideClick);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._handleOutsideClick);
    }

    get avatarSrc() {
        return this.user?.photoURL || '';
    }

    get userName() {
        return this.user?.displayName || 'User';
    }

    get userEmail() {
        return this.user?.email || '';
    }

    get dropdownClass() {
        return `user-menu-dropdown${this._isOpen ? '' : ' slds-hide'}`;
    }

    handleAvatarClick(event) {
        event.stopPropagation();
        this._isOpen = !this._isOpen;
    }

    async handleSignOut() {
        this._isOpen = false;
        try {
            await signOut();
        } catch (err) {
            console.error('Sign-out failed:', err);
        }
    }
}
