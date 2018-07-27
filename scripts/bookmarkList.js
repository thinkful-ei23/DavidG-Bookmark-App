/* global $, store, api */
'use strict';
// eslint-disable-next-line
const bookmarkers = (function() {

  function serialize(form) {
    const formData = new FormData(form);
    const obj = {};
    formData.forEach((val, name) => obj[name] = val);
    return obj;
  }


  function handleGenerateBookmark() {
    $('.js-bookmarks-form').on('submit', event => {
      event.preventDefault();
      let newBookmark = serialize(event.target);
      api.createBookmark(newBookmark, response => {
        store.addBookmark(response);
        render();
      }, message => {
        api.throwError(message);
      });
    });
  }
	
  function generateBookmark(bookmark) {
    if (!bookmark.reduced) {
      return `
			<li class="js-bookmark" data-item-id="${bookmark.id}">
				<div class="js-bookmark-list">
					Title: ${bookmark.title}
					Rating: ${bookmark.rating}
					<p>Description: ${bookmark.desc}<p>
				</div>
				<input type="button" value="Visit Site" onclick="window.location.href='${bookmark.url}'" />
				<br>
				<button class="delete-button">
					<span class="button-label">remove</span>
				</button>
		</li>`;
    }

    return `
			<li class="js-bookmark" data-item-id="${bookmark.id}">
				<div class="js-bookmarklist">
					Title: ${bookmark.title} 
					<br>
					Rating: ${bookmark.rating}
				</div>
				<button class="delete-button">
					<span class="button-label">remove</span>
				</button>
			</li>`;
  }
  
  function generateItemsString(list) {
    const items = list.map((item) => generateBookmark(item));
    return items.join('');
  }
	
  function getItemIdFromElement(item) {
    let bookmarkId = $(item)
      .closest('li.js-bookmark')
      .data('item-id');
    return bookmarkId;
  }
	
  function handleDeleteBookmark() {
    $('#bookmark-list').on('click', '.delete-button', event => {
      const dataId = getItemIdFromElement(event.target);
      api.deleteBookmark(dataId, store.findAndDelete(dataId));
      render();
    });
  }
	
  function handleClickReduced() {
    $('#bookmark-list').on('click', '.js-bookmarklist', event => {
      const dataId = getItemIdFromElement(event.target);
      let bookmark = store.findById(dataId);
      bookmark.reduced = !bookmark.reduced;
      render();
    });
  }

  function handleDropdownFilter() {
    $('.dropdown').on('change', event => {
      store.ratingFilter = Number($(event.target).val());
      render();
    });
  }
	
  function render() {
    let bookmarkList = store.bookmarks;
    if (store.ratingFilter > 0) {
      bookmarkList = store.bookmarks.filter(item => {
        return item.rating >= store.ratingFilter;
      });
    }
    let bookmarkString = generateItemsString(bookmarkList);
    $('#bookmark-list').html(bookmarkString);
  }

  function binderList() {
    handleGenerateBookmark();
    handleDeleteBookmark();
    handleClickReduced();
    handleDropdownFilter();
  }

  return {
    render, 
    binderList
  };
}() );