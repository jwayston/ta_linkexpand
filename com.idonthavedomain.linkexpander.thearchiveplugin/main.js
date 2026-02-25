/* Link expander plugin for "The Archive" app

License: CC-BY-4.0
Author: JW

*/

"use strict";

const LINEBR = "\n";
const selection = input.text.selected.normalize("NFC");
const currentNote = input.notes.selected[0].filename;
const regexLink = new RegExp(/\[{0,}(.+?)(\]{1,}|$)/);
const regexIdDesc = new RegExp(/([0-9]{12,}|[0-9]{6,}.*?(?=\s|$)|.*?(?=\s|$))\s?(.*)/);
const regexNoteHeader = new RegExp("(?<=^|\\n)# (.+)\\n");

if (!selection)
    cancel("Please provide a text selection");


function extractHeader(noteContent)
{
    const headerMatch = noteContent.match(regexNoteHeader);
    return !headerMatch ? "<No H1 header detected>" : headerMatch[1];
}

function findNote(linkText)
{
    let matchIdDesc;
    let noteFound = false;
    const matchSearch = app.search(linkText)

    if (matchSearch.bestMatch && matchSearch.bestMatch.filename !== currentNote)
        noteFound = true;

    if (noteFound)
        matchIdDesc = matchSearch.bestMatch.filename.match(regexIdDesc);
    else
        matchIdDesc = linkText.match(regexIdDesc);

    if (!matchIdDesc)
        return `<Error: cannot extract any remotely ID-like from the link> ${selection}`;

    const id = matchIdDesc[1];
    const desc = matchIdDesc[2];

    if (!desc && noteFound)
        return `${extractHeader(matchSearch.bestMatch.content)} [[${id}]]`;

    return `${desc} [[${id}]]`;
}

function parseLines()
{
    let outputText = "";

    for (const line of selection.split(LINEBR))
    {
        const matchLink = line.match(regexLink);

        if (!matchLink)
        {
            console.log(`General link parsing error for line: ${line}`);
            outputText += `${line}\n`;
            continue;
        }

        const link = matchLink[1];
        const expandedLinkText = findNote(link);
        outputText += `${expandedLinkText}\n`;
    }

    return outputText.replace(/\n$/, "");
}

output.insert.text = parseLines();

