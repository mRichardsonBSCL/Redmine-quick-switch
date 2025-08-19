'use strict';
import './popup.css'

(function() {
  
  const addToHistory = async (type, value) => {
    const linkHistory = await chrome.storage.local.get("history");
    let history = linkHistory?.history || {number: [], text: []};
    const itemsArr = history[type];
    itemsArr.unshift(value);
    itemsArr.splice(10);
    // history[type] = itemsArr
    await chrome.storage.local.set({history});
  } 
  
  function navigateByItem(){
    const itemNumber = document.getElementById("redmine-number").value
    const href = `http://10.1.101.98:8080/redmine/issues/${itemNumber}`
    addToHistory("number", itemNumber);
    window.open(href)
  }

  async function navigateByText(){
    const itemText = document.getElementById("redmine-text").value
    const href = `http://10.1.101.98:8080/redmine/search?issues=1&q="${itemText}"`
    addToHistory("text", itemText);
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

  async function switchView(type) {
    // hide all views
    for (const element of document.getElementsByClassName("popup-view")){
      element.style.display = "none"
    };
    const options = {};
    // only show the correct view
    switch(type){
      case "number":
        document.getElementById("item-number-view").style.display = "flex";
        document.getElementById('redmine-number').focus();
        options.mode = "number";
        await chrome.storage.local.set({options});
        break;
      case "text":
        document.getElementById("text-search-view").style.display = "flex";
        document.getElementById('redmine-text').focus();
        options.mode = "text";
        await chrome.storage.local.set({options});
        break;
      default:
        break;
    }
  }

  function setUpModeBtns() {
    document.getElementById('number-btn').addEventListener("click", () => {
      switchView("number");
    })

    document.getElementById('text-btn').addEventListener("click", () => {
      switchView("text");
    })
  }

  const retrieveSavedItems = async () => {
    const savedItems = await chrome.storage.local.get("history");
    // add recent number searches to a list
    const numberDiv = document.getElementById("recent-number-items")

    for (const item of (savedItems?.history?.number || [])){
      const link = `http://10.1.101.98:8080/redmine/issues/${item}`;
      const newLink = document.createElement('p')
      newLink.className = "item-link"
      newLink.onclick = () => window.open(link)
      newLink.innerText = item;
      numberDiv.appendChild(newLink);
    }
    // add recent text searches to a list
    const textDiv = document.getElementById("recent-text-items")

    for (const item of (savedItems?.history?.text || [])){
      const link = `http://10.1.101.98:8080/redmine/search?issues=1&q="${item}"`;
      const newLink = document.createElement('p')
      newLink.className = "item-link"
      newLink.onclick = () => window.open(link)
      newLink.innerText = item;
      textDiv.appendChild(newLink);
    }
  }

  document.addEventListener('DOMContentLoaded', async function(){
    setUpButtons();
    setUpModeBtns();
    const savedData = await chrome.storage.local.get("options");
    if (savedData?.options?.mode === "text") switchView("text");
    else switchView("number");
    await retrieveSavedItems();
  });
})();
