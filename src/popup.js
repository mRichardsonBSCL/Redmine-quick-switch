'use strict';

import './popup.css';

(function() {
  
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
