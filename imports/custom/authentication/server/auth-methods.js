import { check, Match } from 'meteor/check'

Meteor.methods({
    registerUser( data ) {
        try {
            check(data, Match.ObjectIncluding({
                username: String,
                email: String,
                password: String
            }))

            const { username, email, password } = data;

            const userData = {
                email,
                password,
                profile: {
                    username
                }
            }

            const user = Accounts.createUser( userData );
            if(user) {
                return user;
            }

        } catch ( err ) {
            throw new Meteor.Error(err.error, err.reason || err.message);
        }
    }
})