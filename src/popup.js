'use strict';

import './popup.css';

(function() {
  
  function navigateByItem(){
    const itemNumber = document.getElementById("redmine-number").value
    const href = `http://10.1.101.98:8080/redmine/issues/${itemNumber}`
    window.open(href)
  }

  // TODO
  function navigateByText(){
    const itemText = document.getElementById("redmine-text").value
    const href = `http://10.1.101.98:8080/redmine/search?issues=1&q="${itemText}"`
    window.open(href)
  }

  function setUpButtons() {
    document.getElementById('item-submit-btn').addEventListener("click", () => {
      navigateByItem()
    })

    document.getElementById('text-submit-btn').addEventListener("click", () => {
      navigateByText()
    })

    document.getElementById('redmine-number').addEventListener('keypress', (e) => {
      if (e.key === "Enter") {e.preventDefault(); navigateByItem();}
    });

    document.getElementById('redmine-text').addEventListener('keypress', (e) => {
      if (e.key === "Enter") {e.preventDefault(); navigateByText();}
    });
  }

  function switchView(type) {
    // hide all views
    for (const element of document.getElementsByClassName("popup-view")){
      element.style.display = "none"
    };
    // only show the correct view
    switch(type){
      case "number":
        document.getElementById("item-number-view").style.display = "flex";
        break;
      case "text":
        document.getElementById("text-search-view").style.display = "flex";
        break;
      default:
        break;
    }
  }

  function setUpModeBtns() {
    document.getElementById('number-btn').addEventListener("click", () => {
      switchView("number")
    })

    document.getElementById('text-btn').addEventListener("click", () => {
      switchView("text")
    })
  }

  document.addEventListener('DOMContentLoaded', function(){
    setUpButtons();
    setUpModeBtns();
    switchView("number")
  });
  document.getElementById('redmine-number').focus()

})();
