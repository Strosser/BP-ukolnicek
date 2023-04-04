import { TodoList } from "../../../startup/lib/collections";

Meteor.publish({
    getTodoList(query) {
        if(!query) {
            this.ready();
        }
        return TodoList.find(query);
    }
})