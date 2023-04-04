import './layout.html';
import './loader/loader';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { hideLoader, showLoader, showMessage } from '../startup/lib/client-functions';

Template.layout.events({
    'click .logout'(event, template) {
        showLoader();
        Meteor.logout(err => {
            hideLoader();
            if(!err) {
                FlowRouter.go('login');
                showMessage('Úspěšně odhlášeno!','success');
            }
        })
    }
})