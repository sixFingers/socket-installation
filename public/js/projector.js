var host, ws;

function onSocketMessage(e) {
  var data = JSON.parse(e.data);
  var listenerName = 'on' + data.name;
  var eventData = data[data] || {};
  var listener = commandListeners[listenerName] ? commandListeners[listenerName]: commandListeners.default;
  listener(eventData);
}

var commandListeners = {
  onclick: function(data) {
    console.log('click', data);
  }, 
  default: function(data) {
    console.log(data);
  }
};

$(document).ready(function() {
  host = location.origin.replace(/^http/, 'ws');
  ws = new WebSocket(host);
  ws.onmessage = onSocketMessage;
});
