DEMO:
1. `rails new holidays`
2. add `//= require jquery` to application.js
3. ad `gem 'jquery-rails' to gemfile
4. `rails g scaffold Holidays name:string observed_on:date country:string`
5. On the index page we get a link to new Holiday
6. Let's change it to use AJAX instead of making a page reload
7. add `remote:true` to the link
8. delete `new.html.erb` and create `new.js.erb`
9. in that file write some js (try an alert and a `$('body').html('<h1> etc`)
10. What we want is to show the form to create a new holiday on the page without a refresh.
11. Create an empty div in the index template: `<div id="form--new"></div>`
12. render the form from the javascript in `new.js.erb` template
13. `$('#form--new').html("<%= escape_javascript render partial: 'form', locals: { holiday: @holiday} %>")`
14. Demo: can remove the notice div with `$('#notice').remove();` in `new.js.erb`
15. Could also do this js that loads on the page by putting it in a file that is compiled in the asset pipele: create main.js:

```js
$(document).ready(removeFlash);
//$(document).on("turbolinks:load", removeFlash);

function removeFlash() {
  setTimeout(() => {

    $('#notice').fadeOut(300, function () {
      this.remove();
    });
  }, 4000);
}
```

16. can change the new form to be remote:true as well.
17. Create new partial to render the content of the page; will need to pass in locals, so in `create.js.erb` need to  `render partial: 'partial_name', locals: {holiday: @holiday}` and can also remove the form with jquery
18. OR can name the partial `_holiday.html.erb` and then rails will automatically know what you mean. Can just render `@holiday` and don't need to include locals; it will just work:
    ```js
      console.log('create.js.erb')
      $("#form--new").remove();
      $("#holiday-created").html("<%= j render @holiday %>")
    ```
    ```ruby
      # in _holiday.html.erb partial
      <h2>Here is the Holiday partial</h2>
      <p>Created new holiday:</p>
      <%= holiday.name %>
    ```
19. To get this to create: change the controller code to:

  ```ruby
    def create
      @holiday = Holiday.new(holiday_params)
      if @holiday.save
        respond_to :js
        # redirect_to @holiday, notice: 'Holiday was successfully created.'
      else
        redirect_to holidays_path, notice: 'Something went wrong.'
      end
    end
  ```

