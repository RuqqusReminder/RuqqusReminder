// Add some helper functions the first time math.js is included :)
Date.prototype.addSeconds = function (s) {
    this.setTime(this.getTime() + (s * 1000));
    return this;
}
Date.prototype.addMinutes = function (m) {
    this.setTime(this.getTime() + (m * 60 * 1000));
    return this;
}
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}
Date.prototype.addDays = function (d) {
    this.setTime(this.getTime() + (d * 24 * 60 * 60 * 1000));
    return this;
}
Date.prototype.addWeeks = function (w) {
    this.setTime(this.getTime() + (w * 7 * 24 * 60 * 60 * 1000));
    return this;
}
// TODO: Make this better
Date.prototype.addMonths = function (m) {
    return this.addDays(m*30);
};
Date.prototype.addYears = function (y) {
    this.setFullYear(this.getFullYear() + y);
    return this;
};

function calculateReminderTime(amount, unit) {
    switch (unit) {
        case "second":
            return new Date().addSeconds(amount);
        case "minute":
            return new Date().addMinutes(amount);
        case "hour":
            return new Date().addHours(amount);
        case "day":
            return new Date().addDays(amount);
        case "week":
            return new Date().addWeeks(amount);
        case "month":
            return new Date().addMonths(amount);
        case "year":
            return new Date().addYears(amount);
        default: return new Date();
    }
}

export default {
    calculateReminderTime
}