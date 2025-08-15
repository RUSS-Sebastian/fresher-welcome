/*function handleClick(section) {
    alert("You clicked on " + section + " section!");
  }*/

    function handleClick(section){
      if(section=='kingqueen'){
        window.location.href='kq.html';
      }

      else if(section=='registration'){
        window.location.href='index.html';
      }

      else if(section=='food'){
        window.location.href='';
      }

      else if(section=='activities'){
        window.location.href='view.html';
      }

      else if(section=='feedback'){
        window.location.href='/protected/feed';
      }

      else{
        console.warn('Unknown  section:',section);
      }

    }