function doAlertToast(definitions = {}) {
  definitions.color = '#f60000'
  doToast(definitions);
}
function  doSuccessToast(definitions = {}){
  definitions.color = '#01f500';
  doToast(definitions);
}

function doToast(definitions = {}) {
  $.ajax({
    method: "GET", //method
    url: "./toast.html", //url
    success: (response) => {
      console.log("chegou");

      let el = $(response);
      let body =$("body");

      body.append(el);

      let elToast = $(" .toast");
      let elIcon = $('.toast [data-component-section="icon"]');
      elIcon.css('color', definitions.color != undefined ? definitions.color: '#000');
      let elTitle = $('.toast [data-component-section="title"]');
      elTitle.html(
        definitions.title != undefined ? definitions.title : "Notificação"
      );
      elTitle.css('color', definitions.color != undefined ? definitions.color: '#000');
      console.log(`titulo ` + definitions.title);

      let elBody = $('.toast [data-component-section="body"]');

      elBody.html(definitions.body != undefined ? definitions.body : "...");
      console.log(`corpo ` + definitions.body);

      elToast.toast("show");

      setTimeout(() => {
        elToast.toast("hide");
      }, "4000");
    },
  }).fail((e) => {
    console.log(e);
  });
}
