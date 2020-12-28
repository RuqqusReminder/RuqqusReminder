import * as assert from 'assert';
import regex from './regex.js';

describe("Regex tester", () => {
    it("Get the correct info from a comment", () => {
        assert.deepStrictEqual(regex.parseComment("!REMINDME 20 seconds"), ["20", "second"]);
    });

    it("Gets the correct amount from a comment", () => {
        assert.strictEqual(regex.parseComment("remindme 1 day")[0], "1");
        assert.strictEqual(regex.parseComment("remindme 10 days")[0], "10");
        assert.strictEqual(regex.parseComment("!remindme 1 week")[0], "1");
        assert.strictEqual(regex.parseComment("asdasdremind me 0 years")[0], "0");
    });

    it("Gets the correct unit from a comment", () => {
        assert.strictEqual(regex.parseComment("remindme 1 day")[1], "day");
        assert.strictEqual(regex.parseComment("remindme 10 days")[1], "day");
        assert.strictEqual(regex.parseComment("!remindme 1 week")[1], "week");
        assert.strictEqual(regex.parseComment("asdasdremind me 0 years")[1], "year");
        assert.strictEqual(regex.parseComment("asdasdremind me 0 month")[1], "month");
        assert.strictEqual(regex.parseComment("asdasdremind me 0 hour")[1], "hour");
        assert.strictEqual(regex.parseComment("asdasdremind me 0 minute")[1], "minute");
        assert.strictEqual(regex.parseComment("asdasdremind me 0 second")[1], "second");
    });
});