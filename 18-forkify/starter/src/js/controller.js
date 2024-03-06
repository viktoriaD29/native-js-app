import * as modal from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  //loading recipe
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    //update results view to mark selected search result
    resultsView.update(modal.getSearchResultsPage());

    //when I use the async/efawaiteit function and when I need the result of the promise execution, and not the promise itself (because here loadRecipe function returns a promise), then I can put the await keyword before calling this function. this pauses code execution until the promise executes, so I get the result of the executed promise, not the promise itself. this method allows you not to use then()
    //loading recipe
    await modal.loadRecipe(id);

    //rendering recipe
    recipeView.render(modal.state.recipe);

    //update bookmarks view
    bookmarksView.update(modal.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //get search query
    const query = searchView.getQuery();
    if (!query) return;

    //load search results
    await modal.loadSearchResults(query);

    //render results
    resultsView.render(modal.getSearchResultsPage());

    //render initial pagination buttons
    paginationView.render(modal.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //render NEW results
  resultsView.render(modal.getSearchResultsPage(goToPage));

  //render NEW pagination buttons
  paginationView.render(modal.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings (in state)
  modal.updateServings(newServings);

  //update the recipe view
  recipeView.update(modal.state.recipe);
};

const controlAddBookmark = function () {
  //add/remove bookmark
  if (!modal.state.recipe.bookmarked) {
    modal.addBookmark(modal.state.recipe);
  } else {
    modal.deleteBookmark(modal.state.recipe.id);
  }

  //update recipe view
  recipeView.update(modal.state.recipe);

  //render bookmarks
  bookmarksView.render(modal.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(modal.state.bookmarks);
};

//additional function that helps to catch the event in view part and process the event in controller part
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerRender(controlBookmarks);
};
init();
