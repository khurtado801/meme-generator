import { username, password } from './secrets';

// Action type(s)
export const RECEIVE_MEMES = 'RECEIVED_MEMES';
export const NEW_MEME = 'NEW_MEME';

// Action creator
function receiveMemes(json) {
    const { memes } = json.data;
    // Action
    return {
        // Action return
        type: RECEIVE_MEMES,
        memes
    };
}

function fetchMemesJson() {
    return fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json());
}

// Action creator
export function fetchMemes() {
    return function(dispatch) {
        return fetchMemesJson()
            .then(json => dispatch(receiveMemes(json)));
    };
}

// Action creator
function newMeme(meme) {
    // Action
    return {
        // Action return
        type: NEW_MEME,
        meme
    };
}

// Action creator
function postMemeJson(params) {
    params['username'] = username;
    params['password'] = password;
  
    const bodyParams = Object.keys(params).map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
  
    console.log('bodyParams', bodyParams);
  
    return fetch('https://api.imgflip.com/caption_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: bodyParams
    }).then(response => response.json());
  }
  
  export function createMeme(new_meme_object) {
    return function(dispatch) {
      return postMemeJson(new_meme_object)
        .then(new_meme => dispatch(newMeme(new_meme)));
    };
  }
