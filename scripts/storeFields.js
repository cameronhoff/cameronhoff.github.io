document.addEventListener('DOMContentLoaded', () => {
    // Save the input values in session storage when the user leaves the page
    window.addEventListener('beforeunload', function() {
        var inputs = document.querySelectorAll('input');
        for (var i = 0; i < inputs.length; i++) {
            sessionStorage.setItem(inputs[i].id, inputs[i].value);
        }
    });

    // Retrieve the input values from session storage when the page loads
    window.addEventListener('load', function() {
        var inputs = document.querySelectorAll('input');
        for (var i = 0; i < inputs.length; i++) {
            var value = sessionStorage.getItem(inputs[i].id);
            if (value) {
                inputs[i].value = value;
            }
        }
    });
})