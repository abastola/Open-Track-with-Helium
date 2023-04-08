const url = window.location.href; // get the current URL
const qrCode = new QRCodeStyling({
  width: 150,
  height: 150,
  data: url,
  image: "/images/logo_qr.jpg",
  qrOptions: {
    errorCorrectionLevel: 'H', // set error correction level to high
  },
  renderer: 'svg',
  imageOptions: {
    crossOrigin: 'anonymous', // set cross-origin attribute to avoid CORS errors
  },
  dotsOptions: {
    color: '#000000', // set the color of the QR code dots
    type: 'rounded'
  },
});
qrCode.append(document.getElementById('qrcode')); // append the QR code to an element with id "qrcode" on the HTML page


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


function generateQRCode() {

}

function DownloadQRCode() {
  qrCode.download('qrcode.png'); // add download option to download QR code as png image file

}