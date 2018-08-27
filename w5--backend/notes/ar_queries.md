- `.where`
  - returns an Active Record Relation that contains zero or more objects

  ```ruby
    read_books = Book.where(read: true)
    read_books_by_austen = Book.where(read: true).where(author: "Jane Austen")
  ```

- `.find`
  - to retrieve a single record, you most often use its id (like when you are grabbing it from params as the dynamic segment of the route)

  ```ruby
    book = Book.find(8)
    album = Album.find(params[:id])
  ```

- `.find_by`
  - find a single record but not with a primary key
  - return the first record that matches the conditions in the hash

  ```ruby
    author = Author.find_by(first_name:"John", last_name: "Milton")
  ```

- `.find_by_attribute`
  - dynamic finders!
  - for every attribute you define on your model, you get a finder method for free from AR
  - they can also be combined

  ```ruby
    user = find_by_email('sam@momentumlearn.com')
    book = find_by_author_and_read("Jane Austen", true)
  ```

- `.first` and `.last`

```ruby
  first_three_books = Book.first(3)
  last_book = Book.last
```