function sendEvent(name, data) {
  data = data || {};

  return function() {
    $.ajax({
      url: '/events', 
      type: 'post', 
      data: {
        name: name, 
        data: data
      }, 
      success: function(response) {
        console.log(response);
      }
    });
  }
}

$(document).ready(function() {
  $('#tap-button').click(sendEvent('click'));
});