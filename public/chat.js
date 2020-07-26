const socket = io(); //Generalmente se le pasa el dominio
// DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btnSend = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btnSend.addEventListener('click', function(){
  if(username.value == ''){
    swal(
    {
      type: 'error',
      title: 'Upps!',
      html: 'Falta nombre de usuario',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok!'
    });
  }
  else{
    socket.emit('chat:messageClient',{
      username: username.value,
      message: message.value
    });
    message.value = '';
    username.disabled = true;
    btnSend.disabled = true;
  }
});

message.addEventListener('keyup',function(e){
  if(message.value == ''){
    btnSend.disabled = true;
  }
  else{
    if(username.value != '')
      socket.emit('chat:typingClient', username.value);
    if(e.which == 13) {
      if(username.value == ''){
        swal(
        {
          type: 'error',
          title: 'Upps!',
          html: 'Falta nombre de usuario',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok!'
        });
      }
      else{
        socket.emit('chat:messageClient',{
          username: username.value,
          message: message.value
        });
        message.value = '';
        username.disabled = true;
        btnSend.disabled = true;
      }
    }
    else
      btnSend.disabled = false;
  }
})
socket.on('chat:messageServer', function(data){
  actions.innerHTML = '';
  output.innerHTML += `<p>
  <strong>${data.username}</strong>: ${data.message}
  </p>`;
});
socket.on('chat:typingServer', function(username){
  actions.innerHTML = `<p class='animate__animated animate__infinite animate__fadeInRight animate__slower'>
  <em>${username}: Typing...</em>
  </p>`;
});