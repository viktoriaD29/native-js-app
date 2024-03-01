import * as modal from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  //loading recipe
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    //when I use the async/efawaiteit function and when I need the result of the promise execution, and not the promise itself (because here loadRecipe function returns a promise), then I can put the await keyword before calling this function. this pauses code execution until the promise executes, so I get the result of the executed promise, not the promise itself. this method allows you not to use then()
    await modal.loadRecipe(id);

    //rendering recipe
    recipeView.render(modal.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
