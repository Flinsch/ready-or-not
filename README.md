
ready-or-not
============

ready-or-not is a small JavaScript module to run "ready" handlers flexibly and possibly multiple times, for example every time an AJAX request has been completed and after the DOM content has been loaded.

> **Note:** This documentation is primarily aimed at developers of classic browser applications. But the module can also be easily used in Node.js.

- [Motivation](#motivation)
- [Usage](#usage)
- [Configuration options](#configuration-options)
- [Remarks](#remarks)

# Motivation

The purpose of ready-or-not is similar to jQuery's ready event (or the native DOMContentLoaded event). For example, you would like to do something like this with jQuery:

```js
$(function() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
});
```

And if necessary, certain logic should also be executed on the DOM after each AJAX request:

```js
$(document).ajaxComplete(function() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
});
```

These are only small examples, but when combined, they already violate the DRY principle. The violation could of course be resolved by encapsulating the common logic:

```js
function myReady() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
}

$(function() {
    myReady();
});
$(document).ajaxComplete(function() {
    myReady();
});
```

Furthermore, one potential issue with jQuery's event handling is that jQuery must be defined before the first access occurs: For reasons that should not be discussed here, developers are advised to include the script files at the end of the body element, at least the big ones. But more often than never a specific webpage requires to run logic on the DOM via inline JavaScript:

```HTML
<html>
  ...
  <body>

    ... some stuff here ...

    <script type="text/javascript">
      $(function() { // $ is not yet defined at this point!
          // request-specific DOM logic
      });
    </script>

    ... more stuff there ...

    <script src="jquery.js"></script>
  </body>
</html>
```

To avoid such problems, workarounds have to be tinkered. And this is where the ready-or-not module comes into play.

# Usage

ready-or-not provides a simple interface consisting of five methods encapsulated in an object ```readyon```:

```js
// Initializes the module.
// The config object is optional (see "Configuration options").
readyon.init(config || {});

// Binds the module to jQuery's "ready" and "ajaxComplete" events.
// Whenever one of these events is fired, the module's "ready" method will be triggered (see below).
readyon.bind();

// Registers a handler to be executed each time the module's "ready" method is triggered (see below).
readyon.onReady(handler);

// Registers a handler that runs only once when the module's "ready" method is triggered next time (see below).
readyon.onReadyOnce(handler);

// Triggers the execution of the registered "ready" handlers.
// The optional data argument is passed to each handler.
// Keeps those handlers registered via onReady,
// removes those handlers registered via onReadyOnce.
readyon.ready(data || undefined);
```

(For configuration options see [Configuration options](#configuration-options) below.)

The setup of ready-or-not has been split up into two methods: ```init``` and ```bind```. The reason for this is that ```init``` can be used independently and as early as possible, while ```bind``` requires the previous definition of jQuery. ```bind``` can be omitted in case that you want to call ```readyon.ready()``` manually and/or bind it differently to certain events. If ```bind``` is omitted, jQuery may not be required at all (depending on your own needs) and the module works completely independently.

> **Note:** ```bind``` can be omitted in case that you want to call ```readyon.ready()``` manually and/or bind it differently to certain events.

> **Note:** If ```bind``` is omitted, ready-or-not works completely independently; not even jQuery is required then. But jQuery can still help you bind certain events, etc.

From the user's perspective, ```onReady``` and ```onReadyOnce``` are the core of the interface. After initializing the module, the example from the [Motivation](#motivation) above could look like this:

```js
readyon.onReady(function() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
});
```

This registers a handler that is executed each time ```ready``` is triggered. Without being configured differently, this handler would be executed when the DOM content has been loaded and every time an AJAX request has been completed.

Unfortunately, if DOM-specific inline JavaScript is required, we may not be able to avoid specifying at least some JavaScript at the beginning of the document. But it's still better to just pre-load a tiny module like ready-or-not than a giant monster like jQuery:

```HTML
<html>
  ...
  <body>
    <script src="readyon.js"></script>
    <script type="text/javascript">
      readyon.init();
    </script>

    ... actual HTML and possible inline JavaScript ...

    <script src="jquery.js"></script>
    <script src="your-app.js"></script>
  </body>
</html>
```

Make sure to bind the module (or handle calls to ```readyon.ready()``` manually):

```js
// your-app.js
readyon.bind();
```

Otherwise, if you are sure that no logic has to be executed on the DOM via inline JavaScript, the module file can also be put at the bottom of the document:

```HTML
<html>
  ...
  <body>

    ... actual HTML (without DOM-specific JavaScript) ...

    <script src="jquery.js"></script>
    <script src="readyon.js"></script>
    <script src="your-app.js"></script>
  </body>
</html>
```

Make sure to initialize and possibly bind the module again.

```js
// your-app.js
readyon.init().bind();
```

> **Note:** The use of ready-or-not addresses both aforementioned problems from the [Motivation](#motivation) regarding the DRY principle and possible "$ is not defined" errors. In addition, you have the flexibility to distinguish between "each time" and "only once".

# Configuration options

The configuration options can be passed as an object to ```readyon.init()```, if necessary:

```js
readyon.init({
    log: true
});
```

The available configuration options are as follows:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| domLoadDefault | boolean | true | Bind ```readyon.ready``` to jQuery's "ready" event. |
| ajaxCompleteDefault | boolean | true | Bind ```readyon.ready``` to jQuery's "ajaxComplete" event. |
| log | boolean | false | Log the string "ready" to the browser console when ```readyon.ready()``` is triggered. |

# Remarks

Things to remind when using the ready-or-not module:

- Initialize ready-or-not via ```readyon.init()``` after including the script file and before using the module.
- If you plan to run logic on the DOM via inline JavaScript, you have to include the script file at the beginning of the document; otherwise, the script can be put at the bottom of the document.
- If you don't like pre-loading a script at the beginning of the document at all, you can still include (relevant parts of) the module as inline JavaScript; it's actually not that much code, really.
- If desired, automatically bind the module to jQuery's "ready" and "ajaxComplete" events via ```readyon.bind()``` *after* including jQuery.
- If ```domLoadDefault``` and ```ajaxCompleteDefault``` both are set to ```false```, a call to ```readyon.bind()``` has no effect at all.
- If a call to ```readyon.bind()``` is omitted, you have to bind ```readyon.ready``` differently to certain events and/or call it manually.
- If a call to ```readyon.bind()``` is omitted, ready-or-not works absolutely independently; not even jQuery is required then (but jQuery can still help you bind certain events, etc.).
- If you want a specific ```data``` argument to be passed to ```readyon.ready()``` and thus to your registered handlers, you *have* to set up your own event bindings and/or perform manual calls to ```readyon.ready()```.
- Handlers registered via ```readyon.onReady()``` are executed each time ```readyon.ready()``` is triggered; handlers registered via ```readyon.onReadyOnce()``` are executed only once ```readyon.ready()``` is triggered next time.
- Handlers registered via ```readyon.onReady()``` are *always* executed *before* handlers registered via ```readyon.onReadyOnce()```.
- To help you specify your own event bindings, here are the default definitions from the module's ```bind``` method:
```js
$(function() {
   readyon.ready();
});

$(document).ajaxComplete(function() {
    readyon.ready();
});
```
