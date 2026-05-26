import { LightningElement } from 'lwc';
import { getCurrentRoute } from '../../../router';
import { User } from 'data/labels/User';

export default class User extends LightningElement {
    labels = { User };
    get route() {
        return getCurrentRoute();
    }

    get userId() {
        return this.route?.params?.id ?? '—';
    }
}
