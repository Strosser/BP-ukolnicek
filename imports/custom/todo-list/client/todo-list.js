import './todo-list.html';
import '../../../../public/stylesheets/todo-list.css';
import { hideLoader, showLoader, showMessage } from '../../../startup/lib/client-functions';
import { TodoList } from '../../../startup/lib/collections';
import { CONSTANTS } from '../../../startup/lib/constants';

Template.todoList.onCreated(function() {
    const self = this;
    self.editTaskId = new ReactiveVar(null);
    if(Meteor.userId()) {
        self.subscribe('getTodoList', {createdBy: Meteor.userId()});
    }
})

Template.todoList.helpers({
    getTodos() {
        return TodoList.find({$and: [{createdBy: Meteor.userId()}, {_id: {$ne: Template.instance().editTaskId.get()}}]}, {sort: {updatedAt: -1}});
    },
    checkStatus(status) {
        return this.status === status;
    }
})

Template.todoList.events({
    'keypress #add-todo, click .save-todo'(event, template) {
        if((event.type === "keypress" && event.which === 13) || (event.type === 'click')) {
            const value = $('#add-todo').val()?.trim();
            if(value) {
                showLoader();
                Meteor.call('addTodoMethod', value, template.editTaskId.get(), (err, result) => {
                    hideLoader();
                    if(err) {
                        showMessage(err.reason, 'error');
                        return;
                    }
                    $('#add-todo').val('');
                    template.editTaskId.set(null);
                })
            }
        }
    },
    'click .editTask'(event, template) {
        template.editTaskId.set(this._id);
        $('#add-todo').val(this.text);
    },
    'click .removeTask'(event, template) {
        showLoader();
        Meteor.call('removeTask', this._id, (err, result) => {
            hideLoader();
            if(err) {
                showMessage(err.reason, 'error');
            } else {
                showMessage('Úkol odstraněn úspěšně!', 'success');
            }
        })
    },
    'change .check-task'(event, template) {
        const isChecked = $(event.currentTarget).prop('checked');
        showLoader();
        Meteor.call('checkTask', this._id, isChecked, (err) => {
            hideLoader();
            if(err) {
                showMessage(err.reason, 'error'); 
                $(event.currentTarget).prop('checked', !isChecked);
            } else {
                showMessage(`Úkol označen jako dokončený! ${isChecked ? CONSTANTS.TODO_STATUS.COMPLETED : CONSTANTS.TODO_STATUS.PENDING}!`, 'success');
            }
        })
    }
})