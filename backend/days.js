exports.getToday = () => {
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today;
}

exports.getMonday = (d) => {
    var date = new Date(d)
    var day = date.getDay() || 7;
    if (day !== 1)
        date.setHours(-24 * (day - 1));
    return date;
}