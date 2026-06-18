import { LightningElement, track } from 'lwc';
import {
    PageBreadcrumb, PageTitle, MetaAuthor, MetaDate,
    StatusInactive, StatusTraining, LabelGoal, LabelCapability, LabelStatus,
    GoalValue, CapabilityValue, EditButton,
    TabOverview, TabTrainingMetrics, TabIntegrations, TabVersions, TabSettings, OrgToggleLabel,
    VersionTitle, ActivateButton, EditAltText, CollapseAltText,
    LabelDescription, LabelLastModified, LabelLastModifiedBy, LabelCreatedOn, LabelCreatedBy,
    VersionDetailsTitle, LabelDataSpace, LabelDataModelObjects, LabelRecordsFields, LabelFiltering,
    DescriptionValue, DateValue, AuthorLink,
    DataSpaceValue, DataModelObjectsValue, RecordsFieldsValue, FilteringValue
} from 'data/labels/NbaModelDetail';
import { ComboboxLabel, ComboboxPlaceholder } from 'data/labels/NbaStates';
import { getNbaStateOptions, getNbaStateById } from 'data/services/nbaStatesService';

export default class NbaModelDetail extends LightningElement {
    labels = {
        PageBreadcrumb, PageTitle, MetaAuthor, MetaDate,
        StatusInactive, StatusTraining, LabelGoal, LabelCapability, LabelStatus,
        GoalValue, CapabilityValue, EditButton,
        TabOverview, TabTrainingMetrics, TabIntegrations, TabVersions,
        VersionTitle, ActivateButton, EditAltText, CollapseAltText,
        LabelDescription, LabelLastModified, LabelLastModifiedBy, LabelCreatedOn, LabelCreatedBy,
        VersionDetailsTitle, LabelDataSpace, LabelDataModelObjects, LabelRecordsFields, LabelFiltering,
        DescriptionValue, DateValue, AuthorLink,
        DataSpaceValue, DataModelObjectsValue, RecordsFieldsValue, FilteringValue,
        TabSettings, OrgToggleLabel, ComboboxLabel, ComboboxPlaceholder
    };

    @track selectedStateId = 'training-in-progress';
    @track orgLevelEnabled = false;
    @track toastMessage = '';
    @track showToast = false;

    _toastTimer = null;

    get stateOptions() {
        return getNbaStateOptions();
    }

    get selectedState() {
        return getNbaStateById(this.selectedStateId);
    }

    get nbaCurrentStage() {
        return this.selectedState?.stage ?? 1;
    }

    get nbaStageCompletionDates() {
        return this.selectedState?.dates ?? {};
    }

    get nbaTitleText() {
        return this.selectedState?.title ?? '';
    }

    get nbaDescriptionText() {
        return this.selectedState?.description ?? '';
    }

    get nbaCtaLabel() {
        return this.selectedState?.ctaLabel ?? '';
    }

    get nbaRefreshedText() {
        return this.selectedState?.refreshed ?? '';
    }

    get isModelActive() {
        return this.selectedState?.isActive ?? false;
    }

    get headerStatusLabel() {
        return this.selectedState?.statusLabel ?? 'Inactive';
    }

    get headerActionLabel() {
        return this.isModelActive ? 'Deactivate' : 'Activate';
    }

    get headerActionVariant() {
        return this.isModelActive ? 'destructive' : 'brand';
    }

    get versionButtonLabel() {
        return this.isModelActive ? 'Deactivate' : 'Activate';
    }

    get versionButtonVariant() {
        return this.isModelActive ? 'destructive-text' : 'brand';
    }

    handleStateChange(event) {
        this.selectedStateId = event.detail.value;
    }

    handleNbaCtaClick() {
        // Navigate to activation flow
    }

    handleEnableOrg() {
        this.orgLevelEnabled = true;
    }

    handleOrgToggle(event) {
        this.orgLevelEnabled = event.target.checked;
    }

    handleFeatureEnabled(event) {
        const { message } = event.detail;
        this.toastMessage = message;
        this.showToast = true;
    }

    handleToastDismiss() {
        this.showToast = false;
        this.toastMessage = '';
    }
}
