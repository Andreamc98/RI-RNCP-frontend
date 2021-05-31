export default function(token = null, action) {
    if(action.type == 'saveToken') {
        return action.token;
    } else {
        return token;
    }
  }