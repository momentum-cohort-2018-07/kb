### Callback Life Cycle Basics

For each of the callback events below, there are `before_` and `after_` macros used to register a callback that gets executed before or after the named event occurs.

Callbacks can be registered with either the name of a method or with a block. In either case, `self` refers to the model instance that is undergoing the event.

The most commonly used callbacks are before/after `_validate`, `_create` and `_update`.

#### `_validation`

To register a callback to fire off before `#valid?` is called, use the `before_validation` macro. This callback is often used to set a value to a sensible default so that it passes validation. In the following example, a book saved without a provided title will have a title of "Untitled".

```ruby
class Book < ApplicationRecord
  validates :title, presence: true

  before_validation :set_title

private

  def set_title
    unless title.present?
      self.title = "Untitled"
    end
  end
end

book = Book.create
book.title #=> "Untitled"
```

#### `_create`

The `after_create` callback is useful for triggering an event that needs to fire only after a new record is inserted in the database. Imagine we had a list of subscribers that wished to be notified once a new book was added to a catalog:

```ruby
class Book < ApplicationRecord
  after_create :notify_subscribers_about_new_title

private

  def notify_subscribers_about_new_title
    SubscriberList.notify("A new title has been added to the catalog! Check out '#{title}' today!")
  end
end
```

#### `_update`

Building on the previous example, we could notify our subscriber list of sales using an `after_update` callback. This callback will trigger only when existing books are updated:

```ruby
class Book < ApplicationRecord
  after_update :notify_subscribers_about_sale

private

  def notify_subscribers_about_sale
    if price < price_before_last_save
      SubscriberList.notify("'#{title}' is now on sale for #{price}, get it while you can!")
    end
  end
end
```

#### `_save`

The `before_save` macro registers a callback that will fire before `#save` is called. This applies to both creates and updates. In general the `_create` and `_update` macros should be preferred unless you are absolutely certain you want the event to fire for both kinds of events.

#### Resources

- [Active Record Callbacks](http://guides.rubyonrails.org/active_record_callbacks.html)
- [Active Record Callback Life Cycle](http://api.rubyonrails.org/classes/ActiveRecord/Callbacks.html)