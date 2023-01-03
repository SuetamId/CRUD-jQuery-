if($('[data-menu]') [0] != undefined){
    $.ajax({
        method: "GET", //method
        url: "./menu.html", //url    
        success: (reponse) =>  {
            let el = $(reponse);
            let destino = $('[data-menu]');
            $('[data-menu]').append(el)
            },
      });
} 