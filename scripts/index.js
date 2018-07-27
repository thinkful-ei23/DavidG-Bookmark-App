/* global $, store, api, bookmarkers*/
'use strict';

$(document).ready(function() {
  bookmarkers.binderList();
  api.getBookmark(response => {
    response.forEach(item => {
      store.addBookmark(item);});
    bookmarkers.render();
  });
});