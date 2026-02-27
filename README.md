# Link expander plugin for [The Archive](https://zettelkasten.de/the-archive/)

This plugin takes in a text selection (a link/list of links separated by newline) and expands the links producing description-link pairs.

The link can be partial (UID) or a full filename. Link description is extracted primarily from the actual filename and secondarily from the first appearing H1 heading. Links to non-existing notes are parsed in-place.

**Example**:

```
[[202512291813]]
202512291813
[[202512292021 This is another note]]
[[202512301240 Non-existing link]]
```

will be transformed to

```
This is a note [[202512291813]]
This is a note [[202512291813]]
This is another note [[202512292021]]
Non-existing link [[202512301240]]
```
