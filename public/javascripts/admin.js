function copyURLToClipboard() {
  // Get the current page URL
  const url = window.location.href;

  // Create a new clipboard object
  const clipboard = navigator.clipboard;

  // Write the URL to the clipboard
  clipboard.writeText(url).then(() => {
    // Show a success message to the user using noty.js
    new Noty({
      type: 'success',
      text: 'URL copied to clipboard',
      timeout: 2000, // duration of the toast message in milliseconds
      layout: 'topRight', // position of the toast message on the screen
      theme: 'sunset' // theme of the toast message
    }).show();
  }).catch((error) => {
    // Show an error message to the user using noty.js
    new Noty({
      type: 'error',
      text: 'Failed to copy URL to clipboard: ' + error,
      timeout: 2000, // duration of the toast message in milliseconds
      layout: 'topRight', // position of the toast message on the screen
      theme: 'sunset' // theme of the toast message
    }).show();
  });
}