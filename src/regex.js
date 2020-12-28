function parseComment(comment) {
    comment = comment.toLowerCase();
    let reg = /remind( )?me (\d+) (second|minute|hour|day|week|month|year)/g

    let matches = reg.exec(comment);
    console.log(matches);

    return [matches[2], matches[3]];
}

export default {
    parseComment
}