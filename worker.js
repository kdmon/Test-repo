onmessage = function(obj) {
  console.log('Message received from main script');
  console.log (obj);
  postMessage("Result");
}

