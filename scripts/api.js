/* global $ */
'use strict';
// eslint-disable-next-line
const api =(function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/davidg';

  const getBookmark = function(callback){
    $.getJSON(BASE_URL + '/bookmarks', callback);
  };

  const createBookmark = function(object, callback, error) {
    let newItem = JSON.stringify(object);
    $.ajax({
      url : BASE_URL + '/bookmarks',
      method : 'POST',
      contentType : 'application/json',
      data : newItem,
      success : callback,
      error : error
    });
  };

  const deleteBookmark = function(id, callback, error) {
    $.ajax({
      url : BASE_URL + '/bookmarks/' + id,
      method : 'DELETE',
      contentType : 'application/json',
      success : callback,
      error : error
    });
  };

  const throwError = function(message) {
    let errorMessage = JSON.parse(message.responseText).message;
    console.log('Error is ' + errorMessage);
    alert(errorMessage);
  };

  return {getBookmark, createBookmark, deleteBookmark, throwError};
}() );