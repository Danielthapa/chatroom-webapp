//DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-messg');
const rooms = document.querySelector('.chat-rooms');




//add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
    
});

//update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    //update name via chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);

    //reset form
    newNameForm.reset();

    //show and hide update message
    updateMessage.innerHTML = `Your name was updated to ${newName}`;
    setTimeout(() => updateMessage.innerHTML = '', 3000);
});


// update the chat rooms
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
});


//check local storage for name
const username = localStorage.username ? localStorage.username : 'anonymous';


//class instances

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general' , username );




//get the chat and render
chatroom.getChats(data => chatUI.render(data));
