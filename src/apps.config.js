// src/apps.config.js
export const ACTIVE_APP_STORAGE_KEY = 'active-app';

export const apps = [
    {
        id: 'data360',
        label: 'Data 360',
        isDefault: true,
        navType: 'vertical',
        contextBarItems: [
            { page: 'home', label: 'Home', path: '/' },
        ],
        navItems: [
            {
                id: 'connect-unify',
                label: 'Connect & Unify',
                icon: 'utility:connected_apps',
                children: [
                    { id: 'cu-item-1', label: 'Item 1', path: '/' },
                    { id: 'cu-item-2', label: 'Item 2', path: '/' },
                    { id: 'cu-item-3', label: 'Item 3', path: '/' },
                ],
            },
            {
                id: 'govern-secure',
                label: 'Govern & Secure',
                icon: 'utility:shield',
                children: [
                    { id: 'gs-item-1', label: 'Item 1', path: '/' },
                    { id: 'gs-item-2', label: 'Item 2', path: '/' },
                    { id: 'gs-item-3', label: 'Item 3', path: '/' },
                ],
            },
            {
                id: 'process-enrich',
                label: 'Process & Enrich',
                icon: 'utility:process',
                children: [
                    { id: 'pe-item-1', label: 'Item 1', path: '/' },
                    { id: 'pe-item-2', label: 'Item 2', path: '/' },
                    { id: 'pe-item-3', label: 'Item 3', path: '/' },
                ],
            },
            {
                id: 'explore-optimize',
                label: 'Explore & Optimize',
                icon: 'utility:search',
                children: [
                    { id: 'eo-item-1', label: 'Item 1', path: '/' },
                    { id: 'eo-item-2', label: 'Item 2', path: '/' },
                    { id: 'eo-item-3', label: 'Item 3', path: '/' },
                ],
            },
            {
                id: 'analyze-predict',
                label: 'Analyze & Predict',
                icon: 'utility:chart',
                children: [
                    { id: 'ap-item-1', label: 'Item 1', path: '/' },
                    { id: 'ap-item-2', label: 'Item 2', path: '/' },
                    { id: 'ap-item-3', label: 'Item 3', path: '/' },
                ],
            },
            {
                id: 'segment-act',
                label: 'Segment & Act',
                icon: 'utility:segments',
                children: [
                    { id: 'sa-item-1', label: 'Item 1', path: '/' },
                    { id: 'sa-item-2', label: 'Item 2', path: '/' },
                    { id: 'sa-item-3', label: 'Item 3', path: '/' },
                ],
            },
        ],
    },
    {
        id: 'template',
        label: 'Template App',
        isDefault: false,
        navType: 'horizontal',
        contextBarItems: [
            { page: 'home', label: 'Home', path: '/' },
            { page: 'icons', label: 'Icons', path: '/icons' },
            { page: 'settings', label: 'Settings', path: '/settings' },
            { page: 'churn-rate-segment', label: 'Churn Rate Segment', path: '/churn-rate-segment' },
            { page: 'user', label: 'User', path: '/users/42' },
            { page: 'contacts', label: 'Contacts', path: '/contacts' },
        ],
        navItems: [],
    },
];

export function getDefaultApp() {
    return apps.find((a) => a.isDefault) ?? apps[0];
}

export function getAppById(id) {
    return apps.find((a) => a.id === id) ?? getDefaultApp();
}
