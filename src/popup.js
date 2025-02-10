'use strict';

import './popup.css';

(function() {
  // We will make use of Storage API to get and store `count` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage

  // To get storage access, we have to mention it in `permissions` property of manifest.json file
  // More information on Permissions can we found at
  // https://developer.chrome.com/extensions/declare_permissions
  
  function navigate(){
    const itemNumber = document.getElementById("redmine-number").value
    const href = `http://10.1.101.98:8080/redmine/issues/${itemNumber}`
    window.open(href)
  }

  function setUpButtons() {
    document.getElementById('submit-btn').addEventListener("click", () => {
      navigate()
    })

    document.getElementById('redmine-number').addEventListener('keypress', (e) => {
      console.log(e)
      if (e.key === "Enter") {e.preventDefault(); navigate();}
    });
  }

  document.addEventListener('DOMContentLoaded', setUpButtons);
  document.getElementById('redmine-number').focus()

})();
