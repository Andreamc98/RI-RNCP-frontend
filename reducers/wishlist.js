export default function(wishlist = "", action) {
  if(action.type == 'saveWishlist') {
    var newName = action.name
    return newName;
  } else {
    return wishlist;
  }
}