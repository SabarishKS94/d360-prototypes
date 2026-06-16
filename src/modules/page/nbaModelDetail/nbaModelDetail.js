import { LightningElement } from 'lwc';
import {
    PageBreadcrumb, PageTitle, MetaAuthor, MetaDate,
    StatusInactive, StatusTraining, LabelGoal, LabelCapability, LabelStatus,
    GoalValue, CapabilityValue, EditButton,
    TabOverview, TabTrainingMetrics, TabIntegrations, TabVersions,
    VersionTitle, ActivateButton, EditAltText, CollapseAltText,
    LabelDescription, LabelLastModified, LabelLastModifiedBy, LabelCreatedOn, LabelCreatedBy,
    VersionDetailsTitle, LabelDataSpace, LabelDataModelObjects, LabelRecordsFields, LabelFiltering,
    DescriptionValue, DateValue, AuthorLink,
    DataSpaceValue, DataModelObjectsValue, RecordsFieldsValue, FilteringValue
} from 'data/labels/NbaModelDetail';

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
        DataSpaceValue, DataModelObjectsValue, RecordsFieldsValue, FilteringValue
    };

    nbaCurrentStage = 2;
    nbaStageCompletionDates = { training: '14 days ago' };
    nbaTitleText = 'Training complete. Activate your best version to start predictions';
    nbaDescriptionText = 'v3 achieved 0.92 AUC – best across all versions. Ready for production.';
    nbaCtaLabel = 'Activate Now';
    nbaRefreshedText = 'Refreshed 6 days ago';

    handleNbaCtaClick() {
        // Navigate to activation flow
    }
}
