import Ruqqus from "ruqqus-js";
import dotenv from "dotenv";
import fs from "fs";
import regex from './regex.js';
import datemath from "./datemath.js";
dotenv.config();

let reminders = [];
try {
    reminders = JSON.parse(fs.readFileSync("./reminders.json", "utf-8"));
    reminders.forEach(reminder => {
        reminder.date = new Date(reminder.date);
    });
} catch {};

const client = new Ruqqus.Client({
    id: process.env.ID,
    token: process.env.TOKEN,
    refresh: process.env.REFRESH
});

client.on("comment", async comment => {
    if (comment.content.text.toLowerCase().includes("remindme")) {
        handleRemindMe(comment.content.text, comment.id, comment.reply.bind(comment));
    }

    checkForReminders();
});

function handleRemindMe(text, id, replyFunc) {
    let [amount, unit] = regex.parseComment(text);
    let reminderDate = datemath.calculateReminderTime(amount, unit);
    let prettifiedDate = reminderDate.toUTCString().substring(5, 16);

    console.log("Setting reminder for " + reminderDate);

    reminders.push({ id, date: reminderDate });
    fs.writeFileSync("./reminders.json", JSON.stringify(reminders));
    replyFunc(`Reminding you on ${prettifiedDate}.`);
}

function checkForReminders() {
    reminders.forEach((reminder, index) => {
        if (reminder.date.getTime() < new Date().getTime()) {
            console.log("Triggering reminder for " + JSON.stringify(reminder));

            client.comments.fetch(reminder.id).then(comment => {
                comment.reply("Reminding you of this comment!");
            });

            reminders.splice(index, 1);
            fs.writeFileSync("./reminders.json", JSON.stringify(reminders));
        }
    });
}

export { };