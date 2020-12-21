let rerenderEntireTree = () => {
  console.log('state was changed');
};
let state = {
  messagesPage: {
    dialogs: [
      { name: 'Vitaly', id: 1 },
      { name: 'Sasha', id: 2 },
      { name: 'Boris', id: 3 },
      { name: 'Victor', id: 4 },
    ],
    messages: [
      { message: 'hi', id: 1 },
      { message: 'hi, how are you?', id: 2 },
      { message: 'hi, how are you?', id: 3 },
      { message: " as you see,i'm fine", id: 4 },
      { message: "it's good!", id: 5 },
      { message: 'and you?', id: 6 },
      { message: 'i also feel good', id: 7 },
    ],
  },
  profilePage: {
    posts: [
      {
        text: "Hi,it's my first post",
        id: 1,
        likesCount: 11,
        img:
          'https://i.pinimg.com/originals/80/e5/0d/80e50d775e936217f89af2de58ba7646.jpg',
      },
      {
        text: "It's cool",
        id: 2,
        likesCount: 12,
        img:
          'https://i.pinimg.com/originals/53/f9/8a/53f98a6b76f60356b2b4c261963377e6.jpg',
      },
    ],
    newPostText: '',
  },
};
export const addPost = () => {
  let newPost = {
    text: state.profilePage.newPostText,
    id: 1,
    likesCount: 11,
    img:
      'https://i.pinimg.com/originals/80/e5/0d/80e50d775e936217f89af2de58ba7646.jpg',
  };
  state.profilePage.posts.push(newPost);
  state.profilePage.newPostText = '';
  rerenderEntireTree(state);
};
export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  rerenderEntireTree(state);
};
export let subscribe = (observer) => {
  rerenderEntireTree = observer;
};
rerenderEntireTree(state);
export default state;
