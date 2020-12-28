import Ruqqus from "ruqqus-js";
import dotenv from "dotenv";
import regex from './regex.js';
import datemath from "./datemath.js";
dotenv.config();

let reminders = [];

const client = new Ruqqus.Client({
    id: process.env.ID,
    token: process.env.TOKEN,
    refresh: process.env.REFRESH
});

client.on("comment", async comment => {
    console.log(comment);
    if (comment.content.text.toLowerCase().includes("remindme")) {
        handleRemindMe(comment.content.text, comment.id, comment.reply.bind(comment));
    }

    checkForReminders();
});

function handleRemindMe(text, id, replyFunc) {
    let [amount, unit] = regex.parseComment(text);
    let reminderDate = datemath.calculateReminderTime(amount, unit);
    let prettifiedDate = reminderDate.toUTCString().substring(5, 16);
    reminders.push({ id, date: reminderDate });
    replyFunc(`Reminding you on ${prettifiedDate}.\n\nRight now, here are my reminders: ${JSON.stringify(reminders)}`);
}

function checkForReminders() {
    reminders.forEach((reminder, index) => {
        if (reminder.date.getTime() < new Date().getTime()) {
            client.comments.fetch(reminder.id).then(comment => {
                comment.reply("Reminding you of this comment!");
            });

            reminders.splice(index, 1);
        }
    });
}

export { };