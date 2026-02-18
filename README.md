# Link expander plugin for [The Archive](https://zettelkasten.de/the-archive/)

This plugin takes in a text selection (a link/list of links separated by newline) and expands the link(s) by placing the first H1 header found in the target note before the link.

The link can be partial (e.g. UID). The plugin uses The Archive's internal search matching algorithm and picks the "best match" if found. If no unambiguous match is available, the link will not be expanded.

**Example 1:**

```
[[202512291813]]
```

will transform to:

```
This is a note's first H1 header [[202512291813]]
```

**Example 2:**

```
202512291813
```

will transform to:

```
This is a note's first H1 header 202512291813
```


