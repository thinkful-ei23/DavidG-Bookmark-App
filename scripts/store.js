// eslint-disable-next-line
'use strict';
const store =(function() {
  let ratingFilter = 0;

  const addBookmark = function(item) {
    item.reduced = true;
    this.bookmarks.push(item);
  };

  const findById = function(id) {
    return this.bookmarks.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };
	
  return {bookmarks: [], ratingFilter, addBookmark, findById, findAndDelete};
}() );