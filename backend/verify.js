const Polls = require('./models/polls');
const days = require('./days');

exports.verifyVote = (req, res, next) => {

    var restaurant = req.body.restaurant;

    if (restaurant === '' || restaurant === ' ') {
        var err = new Error('restaurant name invalid!');
        err.status = 406;
        return next(err);
    }

    var today = days.getToday();
    var yesterday = days.getToday();
    yesterday.setDate(yesterday.getDate() - 1);
    var monday = days.getMonday(today);
    
    Polls.find({ date: { $gte: monday, $lte: yesterday } })
        .then((polls) => {

            for (var i = 0; i < polls.length; i++) {
                var pickedRestaurant;
                var restaurantVotes = 0;
                for (var j = 0; j < polls[i].options.length; j++) {
                    if (polls[i].options[j].votes.length > restaurantVotes) {
                        pickedRestaurant = polls[i].options[j].restaurant;
                        restaurantVotes = polls[i].options[j].votes.length;
                    }
                }
                if (pickedRestaurant === restaurant) {
                    var err = new Error('restaurant name invalid!');
                    err.status = 406;
                    return next(err);
                }
            }

            return next();

        }, (err) => next(err))
        .catch((err) => next(err));
}
