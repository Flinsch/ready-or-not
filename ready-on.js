
if (readyon.config.domLoadDefault) {
    $(function() {
        readyon.ready();
    });
}
if (readyon.config.ajaxCompleteDefault) {
    $(document).ajaxComplete(function(event, jqXHR, ajaxOptions) {
        readyon.ready();
    });
}
