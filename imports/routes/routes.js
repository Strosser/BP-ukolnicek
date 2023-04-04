import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/register', {
    name: 'register',
    action() {
      if(!Meteor.userId()) {
        import('../custom/authentication/client/register').then(() => {
          BlazeLayout.render('layout', {
              main: 'register'
          })
        })
      } else {
        FlowRouter.go('todoList')
      }
    }
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    if(!Meteor.userId()) {
      import('../custom/authentication/client/login').then(() => {
        BlazeLayout.render('layout', {
            main: 'login'
        })
      })
    } else {
      FlowRouter.go('todoList')
    }
  }
});

FlowRouter.route('/todo-list', {
  name: 'todoList',
  action() {
    if(Meteor.userId()) {
      import('../custom/todo-list/client/todo-list').then(() => {
        BlazeLayout.render('layout', {
            main: 'todoList'
        })
      })
    } else {
      FlowRouter.go('login')
    }
  }
});

FlowRouter.route('*', {
  action() {
    FlowRouter.go('login')
  }
});