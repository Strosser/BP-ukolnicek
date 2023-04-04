import './login.html';
import '../../../../public/stylesheets/auth.css';
import { hideLoader, showLoader, showMessage } from '../../../startup/lib/client-functions';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.login.events( {
    'submit #loginForm'(event, template) {
        event.preventDefault();
        const email = $('#email').val()?.toLowerCase()?.trim();
        const password = $('#password').val();

        showLoader();
        Meteor.loginWithPassword({email}, password, (err) => {
            hideLoader();
            if(err){
                showMessage('Zadali jste nesprávné heslo');
            } else {
                showMessage('Přihlášen úspěšně!', 'success');
                FlowRouter.go('todoList');
            }
        })
    }
} )