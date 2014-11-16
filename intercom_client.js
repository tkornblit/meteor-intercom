//Forked by TK

IntercomSettings = {};

if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.intercom && Meteor.settings.public.intercom.id) {

    Meteor.subscribe('intercomHash');

    var minimumUserInfo = function(user) {
        var info = {
            app_id: Meteor.settings.public.intercom.id,

            user_id: user._id,

            created_at: Math.round(Meteor.user().createdAt / 1000)
        };

        // they actually need to have this but it can be useful for testing
        if (user.intercomHash)
            info.user_hash = user.intercomHash;

        return info;
    };



    IntercomSettings.minimumUserInfo = minimumUserInfo;

    var booted = {};

    // send data to intercom
    Meteor.startup(function() {
        Deps.autorun(function() {
            var user = Meteor.user();
            if (!user) { // "log out"
                return Intercom('shutdown');
            }

            var info = IntercomSettings.minimumUserInfo(user);
            if (IntercomSettings.userInfo) {
                var ready = IntercomSettings.userInfo(user, info);
                if (ready === false)
                    return;
            }


            if (info && info.user_id) {

                var type = booted[info.user_id] ? 'update' : 'boot';

                console.log(type, info);

                Intercom(type, info);

                booted[info.user_id] = true;
            }
        });
    });

} else {
    console.log("public.intercom.id has not been set in your settings.json file.");
}