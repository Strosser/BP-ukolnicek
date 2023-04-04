import './loader.html';
import './loader.css';

Template.layoutLoader.helpers({
    isLoader() {
        return Session.get('isLoader')
    }
})