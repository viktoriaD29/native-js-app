import * as modal from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    alert(err);
  }
};
controlRecipes();

//this is a way to hang several events on the same element
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
