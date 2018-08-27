# ready-or-not
ready-or-not is a small JavaScript module to run "ready" handlers flexibly and possibly multiple times, for example every time an AJAX request has been completed and after the DOM content has been loaded.

The purpose is similar to jQuery's ready event (or the native DOMContentLoaded event), for example:

```JS
$(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
```

And if necessary, certain logic should also be executed on the DOM after each AJAX request:

```JS
$(document).ajaxComplete(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
```

The problem with jQuery's event handling is that jQuery needs to be preloaded for this.
For reasons I do not want to discuss here, developers are advised to include the script files at the end of the body element.
