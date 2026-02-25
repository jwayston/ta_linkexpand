# Link expander plugin for [The Archive](https://zettelkasten.de/the-archive/)

This plugin takes in a text selection (a link/list of links separated by newline) and expands the links producing description-link pairs.

The link can be partial (UID) or a full filename. Link description is extracted primarily from the actual filename and secondarily from the first appearing H1 heading. Links to non-existing notes are parsed in-place.

**Examples**:

In: `[[202512291813]]`
Out: `This is a note [[202512291813]]`

In: `202512291813`
Out: `This is a note [[202512291813]]`

In: `[[202512292021 This is another note]]`
Out: `This is another note [[202512292021]]`

In: `[[202512301240 Non-existing link]]`
Out: `Non-existing link [[202512301240]]`

