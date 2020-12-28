import * as assert from 'assert';
import datemath from './datemath.js';

function roundToSecond(ms) {
    return Math.round(ms / 1000) * 1000;
}

describe("Math date calculation tester", () => {
    it("Correctly adds seconds", () => {
        assert.strictEqual(10000, roundToSecond(datemath.calculateReminderTime(10, "second").getTime() - new Date().getTime()));
        assert.strictEqual(0, roundToSecond(datemath.calculateReminderTime(0, "second").getTime() - new Date().getTime()));
        assert.strictEqual(6000000, roundToSecond(datemath.calculateReminderTime(6000, "second").getTime() - new Date().getTime()));
    });
    it("Correctly adds minutes", () => {
        assert.strictEqual(10 * 60 * 1000, roundToSecond(datemath.calculateReminderTime(10, "minute").getTime() - new Date().getTime()));
        assert.strictEqual(0, roundToSecond(datemath.calculateReminderTime(0, "minute").getTime() - new Date().getTime()));
        assert.strictEqual(6000 * 60 * 1000, roundToSecond(datemath.calculateReminderTime(6000, "minute").getTime() - new Date().getTime()));
    });
    it("Correctly adds hours", () => {
        assert.strictEqual(10 * 60 * 60 * 1000, roundToSecond(datemath.calculateReminderTime(10, "hour").getTime() - new Date().getTime()));
        assert.strictEqual(0, roundToSecond(datemath.calculateReminderTime(0, "hour").getTime() - new Date().getTime()));
        assert.strictEqual(6000 * 60 * 60 * 1000, roundToSecond(datemath.calculateReminderTime(6000, "hour").getTime() - new Date().getTime()));
    });
    it("Correctly adds days", () => {
        assert.strictEqual(10 * 24 * 60 * 60 * 1000, roundToSecond(datemath.calculateReminderTime(10, "day").getTime() - new Date().getTime()));
        assert.strictEqual(0, roundToSecond(datemath.calculateReminderTime(0, "day").getTime() - new Date().getTime()));
        assert.strictEqual(6000 * 24 * 60 * 60 * 1000, roundToSecond(datemath.calculateReminderTime(6000, "day").getTime() - new Date().getTime()));
    });
    it("Correctly adds weeks", () => {
        assert.strictEqual(10 * 7 * 24 * 60 * 60 * 1000, roundToSecond(datemath.calculateReminderTime(10, "week").getTime() - new Date().getTime()));
        assert.strictEqual(0, roundToSecond(datemath.calculateReminderTime(0, "week").getTime() - new Date().getTime()));
        assert.strictEqual(6000 * 7 * 24 * 60 * 60 * 1000, roundToSecond(datemath.calculateReminderTime(6000, "week").getTime() - new Date().getTime()));
    });
    it("Correctly adds months", () => {
        // Note: Months are considered to be 30 days each. Feel free to PR it better
        assert.strictEqual(10 * 30 * 24 * 60 * 60 * 1000, roundToSecond(datemath.calculateReminderTime(10, "month").getTime() - new Date().getTime()));
        assert.strictEqual(0, roundToSecond(datemath.calculateReminderTime(0, "month").getTime() - new Date().getTime()));
        assert.strictEqual(6000 * 30 * 24 * 60 * 60 * 1000, roundToSecond(datemath.calculateReminderTime(6000, "month").getTime() - new Date().getTime()));
    });
    it("Correctly adds years", () => {
        let addedYears = datemath.calculateReminderTime(10, "year").getFullYear();
        assert.strictEqual(new Date().getFullYear() + 10, addedYears);

        addedYears = datemath.calculateReminderTime(0, "year").getFullYear();
        assert.strictEqual(new Date().getFullYear(), addedYears);

        addedYears = datemath.calculateReminderTime(6000, "year").getFullYear();
        assert.strictEqual(new Date().getFullYear() + 6000, addedYears);
    });
});