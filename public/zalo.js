
setTimeout(() => {
  var head_ID = document.getElementsByTagName("head")[0];
  var script_element = document.createElement('script');
  // Set the script type to JavaScript
  script_element.type = 'text/javascript';
  // External JS file
  script_element.src = `https://sp.zalo.me/plugins/sdk.js`
  head_ID.appendChild(script_element);

}, 5000)