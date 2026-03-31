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
                    { id: 'cu-item-1', label: 'Item 1', path: '/connect-unify/item-1', component: 'page-connect-unify1' },
                    { id: 'cu-item-2', label: 'Item 2', path: '/connect-unify/item-2', component: 'page-connect-unify2' },
                    { id: 'cu-item-3', label: 'Item 3', path: '/connect-unify/item-3', component: 'page-connect-unify3' },
                ],
            },
            {
                id: 'govern-secure',
                label: 'Govern & Secure',
                icon: 'utility:shield',
                children: [
                    { id: 'gs-item-1', label: 'Item 1', path: '/govern-secure/item-1', component: 'page-govern-secure1' },
                    { id: 'gs-item-2', label: 'Item 2', path: '/govern-secure/item-2', component: 'page-govern-secure2' },
                    { id: 'gs-item-3', label: 'Item 3', path: '/govern-secure/item-3', component: 'page-govern-secure3' },
                ],
            },
            {
                id: 'process-enrich',
                label: 'Process & Enrich',
                icon: 'utility:process',
                children: [
                    { id: 'pe-item-1', label: 'Item 1', path: '/process-enrich/item-1', component: 'page-process-enrich1' },
                    { id: 'pe-item-2', label: 'Item 2', path: '/process-enrich/item-2', component: 'page-process-enrich2' },
                    { id: 'pe-item-3', label: 'Item 3', path: '/process-enrich/item-3', component: 'page-process-enrich3' },
                ],
            },
            {
                id: 'explore-optimize',
                label: 'Explore & Optimize',
                icon: 'utility:search',
                children: [
                    { id: 'eo-item-1', label: 'Item 1', path: '/explore-optimize/item-1', component: 'page-explore-optimize1' },
                    { id: 'eo-item-2', label: 'Item 2', path: '/explore-optimize/item-2', component: 'page-explore-optimize2' },
                    { id: 'eo-item-3', label: 'Item 3', path: '/explore-optimize/item-3', component: 'page-explore-optimize3' },
                ],
            },
            {
                id: 'analyze-predict',
                label: 'Analyze & Predict',
                icon: 'utility:chart',
                children: [
                    { id: 'ap-item-1', label: 'Item 1', path: '/analyze-predict/item-1', component: 'page-analyze-predict1' },
                    { id: 'ap-item-2', label: 'Item 2', path: '/analyze-predict/item-2', component: 'page-analyze-predict2' },
                    { id: 'ap-item-3', label: 'Item 3', path: '/analyze-predict/item-3', component: 'page-analyze-predict3' },
                ],
            },
            {
                id: 'segment-act',
                label: 'Segment & Act',
                icon: 'utility:segments',
                children: [
                    { id: 'sa-item-1', label: 'Item 1', path: '/segment-act/item-1', component: 'page-segment-act1' },
                    { id: 'sa-item-2', label: 'Item 2', path: '/segment-act/item-2', component: 'page-segment-act2' },
                    { id: 'sa-item-3', label: 'Item 3', path: '/segment-act/item-3', component: 'page-segment-act3' },
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
