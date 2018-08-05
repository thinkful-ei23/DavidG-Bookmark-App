/* global $, store, api */
'use strict';

const bookmarkers = (function() {
  function handleGenerateBookmark() {
    $('.js-bookmarks-add-form').on('submit', e => {
      e.preventDefault();
      let newBookmark = serialize(e.target);
      api.createBookmark(newBookmark, response => {
        store.addBookmark(response);
        render();
      }, message => {
        api.throwError(message);
      });
    });
  }
	
  function serialize(form) {
    const formData = new FormData(form);
    const obj = {};
    formData.forEach((val, name) => obj[name] = val);
    return obj;
  }
	
  function generateBookmark(bookmark) {
    if (!bookmark.reduced) {
      return `
			<li class="js-bookmark" data-item-id="${bookmark.id}">
				<div class="js-bookmark-not-button">
        <div style="float: left">Title: ${bookmark.title} </div>
        <div style="float: right">Rating: ${bookmark.rating}</div>
				<div style="clear: both" class="description">Description: ${bookmark.desc}</div>
        </div>
        <a href="${bookmark.url}" class="button">GO</a>
				<button class="delete-button">
					<span class="button-label">remove</span>
				</button>
		</li>`;
    }
    return `
			<li class="js-bookmark" data-item-id="${bookmark.id}">
				<div class="js-bookmark-not-button">
					 ${bookmark.title} 
					<p>${bookmark.rating} Stars
				</div>
			</li>`;
  }
	
	
  function getItemIdFromElement(item) {
    let upstream = $(item)
      .closest('li.js-bookmark')
      .data('item-id');
    return upstream;
  }
	
  function handleDeleteBookmark() {
    $('#bookmark-list').on('click', '.delete-button', e => {
      const dataId = getItemIdFromElement(e.target);
      api.deleteBookmark(dataId, store.findAndDelete(dataId));
      render();
    });
  }
	
  function handleClickReduced() {
    $('#bookmark-list').on('click', '.js-bookmark-not-button', e => {
      const dataId = getItemIdFromElement(e.target);
      let bookmark = store.findById(dataId);
      bookmark.reduced = !bookmark.reduced;
      render();
    });
  }

  function handleDropdownPicker() {
    $('.dropdown').on('change', e => {
      store.ratingFilter = Number($(e.target).val());
      render();
    });
  }
	
  function generateItemsString(list) {
    const items = list.map((item) => generateBookmark(item));
    return items.join('');
  }
	
  function render() {
    let books = store.bookmarks;
    if (store.ratingFilter > 0) {
      books = store.bookmarks.filter(item => {
        return item.rating >= store.ratingFilter;
      });
    }
    let bookmarkString = generateItemsString(books);
    $('#bookmark-list').html(bookmarkString);
  }

  function binderList() {
    handleClickReduced();
    handleDeleteBookmark();
    handleGenerateBookmark();
    handleDropdownPicker();
  }

  return {
    render, 
    binderList
  };
}() );