/* Link expander plugin for "The Archive" app

License: CC-BY-4.0
Author: JW

*/

"use strict";

const uidSet = new Set();
const selected = input.text.selected;

const extractLink = text => text.match(/\[\[(.*?)\]\]/)?.[1];
const getHeader = content => 
    content.match(/(?:^|\n)# (.+)/)?.[1] ?? "<No H1 header>";

const getNoteData = (filename, content) => {
    const [_, id, desc] = filename.match(/^(\d{6,}\S*)\s*(.*)/) ?? [];
    return id ? { id, desc: desc.trim() || getHeader(content) } : null;
}

const findNote = id => {
    const m = app.search(id, false).bestMatch;
    return m?.filename.startsWith(id) && m;
}

const extractDescription = text => {
    const link = extractLink(text);
    let note = findNote(link);

    const data = note && getNoteData(note.filename, note.content);
    const id = data?.id || link || text;
    const desc = data?.desc || link?.slice(link.indexOf(" ") + 1).trim() || "<No descr>";

    return `${desc} [[${id}]]`;
}

const out = selected.split("\n")
    .map(extractDescription)
    .join("\n");

output.insert.text = out;

