import { check } from 'meteor/check'
import { TodoList } from '../../../startup/lib/collections'
import { CONSTANTS } from '../../../startup/lib/constants.js'

Meteor.methods({
    addTodoMethod( text, id ) {
        try {
            if(!Meteor.userId()) {
                throw new Meteor.Error(401, 'Pro pokračování se musíte přihlásit!')
            }

            check(text, String)

            const data = {
                text,
                updatedBy: Meteor.userId(),
                updatedAt: new Date(),
            }

            if(!id) {
                data.createdBy = Meteor.userId();
                data.createdAt = new Date();
                data.status = CONSTANTS.TODO_STATUS.PENDING
            }

            return TodoList.upsert({_id: id}, {$set: data})

        } catch ( err ) {
            throw new Meteor.Error(err.error, err.reason || err.message);
        }
    },
    removeTask(id) {
        try {
            if(!Meteor.userId()) {
                throw new Meteor.Error(401, 'Pro pokračování se musíte přihlásit!')
            }

            if(!id) {
                throw new Meteor.Error(400, 'Poskytněte nám id!')
            }

            const task = TodoList.findOne({_id: id});
            if(!task) {
                throw new Meteor.Error(404, 'Úkol nenalezen!');
            }

            if(task.createdBy !== Meteor.userId()) {
                throw new Meteor.Error(403, 'Neautorizovaný!');  
            }

            return TodoList.remove({_id: id});
        } catch ( err ) {
            throw new Meteor.Error(err.error, err.reason || err.message);
        }
    },
    checkTask(id, isCompleted) {
        if(!Meteor.userId()) {
            throw new Meteor.Error(401, 'Pro pokračování se musíte přihlásit!')
        }

        if(!id) {
            throw new Meteor.Error(400, 'Poskytněte nám id!')
        }

        const task = TodoList.findOne({_id: id});
        if(!task) {
            throw new Meteor.Error(404, 'Úkol nenalezen!');
        }

        if(task.createdBy !== Meteor.userId()) {
            throw new Meteor.Error(403, 'Neautorizovaný!');  
        }

        return TodoList.update({_id: id}, {$set: {status: isCompleted ? CONSTANTS.TODO_STATUS.COMPLETED : CONSTANTS.TODO_STATUS.PENDING}});
    }
})