// src/modules/shell/verticalNav/verticalNav.js
import { LightningElement, api, track } from 'lwc';

const STORAGE_KEY = 'vertical-nav-collapsed';

export default class VerticalNav extends LightningElement {
    // TODO: wire active-item highlighting when real routes are assigned to nav items
    @api currentPage = '';
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
            expanded[group.id] = true;
        });
        this._expandedGroups = expanded;
    }

    get filteredGroups() {
        const query = (this.quickFindValue || '').toLowerCase().trim();
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

            const isExpanded = !!this._expandedGroups[group.id];
            acc.push({
                ...group,
                isExpanded,
                chevronIcon: isExpanded ? 'utility:chevrondown' : 'utility:chevronright',
                filteredChildren: filteredChildren.map((item) => ({ ...item })),
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
        return this.isCollapsed ? 'Expand' : 'Collapse';
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
}
