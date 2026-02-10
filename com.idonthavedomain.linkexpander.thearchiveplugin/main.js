/* Link expander plugin for "The Archive" app

License: CC-BY-4.0
Author: JW

*/

"use strict";

const LINEBR = "\n";

const selection = input.text.selected.normalize("NFC");
if (!selection)
{
    cancel("Please provide a text selection");
}

const linkRegex = new RegExp(/\[{0,}(.+?)(\]{1,}|$)/);

function extractHeader(noteContent)
{
    const contentRegexp = new RegExp("^# (.+)\\n");
    const contentMatch = noteContent.match(contentRegexp);
    if (contentMatch)
    {
        return contentMatch[1];
    }
    else
    {
        return "No H1 headers found";
    }
}

function findNote(linkText)
{
    const fileMatch = app.search(linkText)

    if (fileMatch.bestMatch)
    {
        const expanded = `${extractHeader(fileMatch.bestMatch.content)} [[${linkText}]]`;
        return expanded;
    }

    return `<Error: no unambiguous note found> ${selection}`;
}


let outputText = "";

selection.split(LINEBR).forEach(elem =>
    {
        const linkMatch = elem.match(linkRegex);

        if (!linkMatch)
        {
            console.log(`General link parsing error for line: ${elem}`);
            return;
        }

        const link = linkMatch[1];
        if(!link)
        {
            cancel("Couldn't parse link from the selected text");
        }

        const expandedLinkText = findNote(link);
        outputText += `${expandedLinkText}\n`;
    })

output.insert.text = outputText;
