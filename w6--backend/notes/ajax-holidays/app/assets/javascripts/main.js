$(document).on("turbolinks:load", removeFlash);

function removeFlash() {
  setTimeout(() => {

    $('#notice').fadeOut(300, function () {
      this.remove();
    });
  }, 3000);
}