// src/modules/shell/verticalNav/verticalNav.js
import { LightningElement, api, track } from 'lwc';
import * as Labels from 'data/labels/VerticalNav';

const STORAGE_KEY = 'vertical-nav-collapsed';

export default class VerticalNav extends LightningElement {
    labels = Labels;
    @api currentPage = '';
    @api currentPath = '/';
    @api navItems = [];

    quickFindValue = '';
    @track _expandedGroups = {};
    isCollapsed = false;

    connectedCallback() {
        this.isCollapsed = localStorage.getItem(STORAGE_KEY) === 'true';
        this._initExpandedGroups();
    }

    _initExpandedGroups() {
        const expanded = {};
        (this.navItems || []).forEach((group) => {
            expanded[group.id] = false;
        });
        this._expandedGroups = expanded;
    }

    get filteredGroups() {
        const query = (this.quickFindValue || '').toLowerCase().trim();
        const activePath = this.currentPath;
        return (this.navItems || []).reduce((acc, group) => {
            const filteredChildren = query
                ? group.children.filter((item) =>
                      item.label.toLowerCase().includes(query)
                  )
                : [...group.children];

            const isGroupVisible =
                !query ||
                group.label.toLowerCase().includes(query) ||
                filteredChildren.length > 0;

            if (!isGroupVisible) return acc;

            const hasActiveChild = filteredChildren.some((item) => item.path === activePath);
            const isExpanded = !!this._expandedGroups[group.id] || hasActiveChild;
            acc.push({
                ...group,
                isExpanded,
                chevronIcon: isExpanded ? 'utility:chevrondown' : 'utility:chevronright',
                filteredChildren: filteredChildren.map((item) => {
                    const isActive = item.path === activePath;
                    return {
                        ...item,
                        isActive,
                        itemClass: isActive
                            ? 'slds-nav-vertical__item slds-is-active'
                            : 'slds-nav-vertical__item',
                        ariaCurrent: isActive ? 'page' : undefined,
                    };
                }),
            });
            return acc;
        }, []);
    }

    get navClass() {
        return this.isCollapsed ? 'vertical-nav vertical-nav_collapsed' : 'vertical-nav';
    }

    get collapseIcon() {
        return this.isCollapsed ? 'utility:right' : 'utility:left';
    }

    get collapseLabel() {
        return this.isCollapsed ? this.labels.Expand : this.labels.Collapse;
    }

    get quickStartLinkClass() {
        const base = 'vertical-nav__footer-link';
        const isActiveHome = this.currentPage === 'home';
        return isActiveHome ? `${base} vertical-nav__footer-link_active` : base;
    }

    handleQuickFindChange(event) {
        this.quickFindValue = event.detail.value;
    }

    handleGroupToggle(event) {
        const groupId = event.currentTarget.dataset.groupId;
        this._expandedGroups = {
            ...this._expandedGroups,
            [groupId]: !this._expandedGroups[groupId],
        };
    }

    handleItemClick(event) {
        event.preventDefault();
        const path = event.currentTarget.dataset.path;
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { path },
                bubbles: true,
                composed: true,
            })
        );
    }

    handleCollapseToggle() {
        this.isCollapsed = !this.isCollapsed;
        localStorage.setItem(STORAGE_KEY, String(this.isCollapsed));
    }

    handleCollapsedSearchClick() {
        if (!this.isCollapsed) return;
        this.isCollapsed = false;
        localStorage.setItem(STORAGE_KEY, 'false');
        requestAnimationFrame(() => {
            const input = this.template.querySelector('.vertical-nav__search lightning-input');
            if (input && typeof input.focus === 'function') {
                input.focus();
            }
        });
    }
}
