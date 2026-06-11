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
    _tooltip = null;

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
        const collapsed = this.isCollapsed;
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
            const isExpanded = !collapsed && (!!this._expandedGroups[group.id] || hasActiveChild);
            const headerBase = 'slds-button slds-button_reset slds-grid slds-align-items-center slds-p-vertical_x-small slds-p-horizontal_small vertical-nav__group-header';
            const headerClass = (collapsed && hasActiveChild)
                ? `${headerBase} vertical-nav__group-header_active`
                : headerBase;
            acc.push({
                ...group,
                isExpanded,
                showChildren: isExpanded && !collapsed,
                headerClass,
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
        return this.isCollapsed ? 'utility:arrow_right' : 'utility:arrow_left';
    }

    get collapseLabel() {
        return this.isCollapsed ? this.labels.Expand : this.labels.Collapse;
    }

    get tooltipStyle() {
        if (!this._tooltip) return '';
        return `top:${this._tooltip.top}px;left:${this._tooltip.left}px`;
    }

    get tooltipText() {
        return this._tooltip ? this._tooltip.text : '';
    }

    get quickStartLinkClass() {
        const base = 'slds-grid slds-align-items-center slds-p-vertical_x-small slds-p-horizontal_small slds-m-bottom_xx-small vertical-nav__footer-link';
        const isActiveHome = this.currentPage === 'home';
        return isActiveHome ? `${base} vertical-nav__footer-link_active` : base;
    }

    handleQuickFindChange(event) {
        this.quickFindValue = event.detail.value;
    }

    handleGroupToggle(event) {
        if (this.isCollapsed) {
            this.isCollapsed = false;
            localStorage.setItem(STORAGE_KEY, 'false');
            return;
        }
        const groupId = event.currentTarget.dataset.groupId;
        this._expandedGroups = {
            ...this._expandedGroups,
            [groupId]: !this._expandedGroups[groupId],
        };
    }

    handleItemClick(event) {
        event.preventDefault();
        if (this.isCollapsed) {
            this.isCollapsed = false;
            localStorage.setItem(STORAGE_KEY, 'false');
            return;
        }
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

    handleTooltipShow(event) {
        const btn = event.currentTarget;
        const text = btn.dataset.tooltipText;
        if (!text) return;
        const rect = btn.getBoundingClientRect();
        const GAP = 8;
        this._tooltip = {
            text,
            top: rect.top + rect.height / 2,
            left: rect.right + GAP,
        };
    }

    handleTooltipHide() {
        this._tooltip = null;
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
