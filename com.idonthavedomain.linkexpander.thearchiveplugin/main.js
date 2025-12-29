/* Link expander plugin for "The Archive" app

License: CC-BY-4.0
Author: JW

*/

"use strict";


const selection = input.text.selected;
if (!selection)
{
	cancel("Please provide a text selection");
}

const linkRegex = new RegExp(/\[{0,}(.+?)(\]{1,}|$)/);
const linkMatch = selection.match(linkRegex);

if (!linkMatch)
{
	cancel("General link parsing error");
}

const link = linkMatch[1];
if(!link)
{
	cancel("Couldn't parse link from the selected text");
}

console.log(`Trying to expand a link [[${link}]]`);

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
		const expanded = `${extractHeader(fileMatch.bestMatch.content)} ${selection}`;
		return expanded;
	}

	return `<Error: no unambiguous note found> ${selection}`;
}

const expandedLinkText = findNote(link);
output.insert.text = expandedLinkText;