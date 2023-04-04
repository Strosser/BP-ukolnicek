import './register.html';
import '../../../../public/stylesheets/auth.css';
import { hideLoader, showLoader, showMessage } from '../../../startup/lib/client-functions';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.register.events( {
    'submit #registerForm'(event, template) {
        event.preventDefault();
        const data = {
            username: $('#username').val()?.trim(),
            email: $('#email').val()?.toLowerCase()?.trim(),
            password: $('#password').val()
        }

        showLoader();
        Meteor.call('registerUser', data, (err, result) => {
            hideLoader();
            if(err) {
                showMessage(err.reason, 'error')
            } else {
                showMessage(`Registrace proběhla úspěšně,\nNiný se můžete přihlásit!`, 'success');
                FlowRouter.go('login');
            }
        })
    }
} )