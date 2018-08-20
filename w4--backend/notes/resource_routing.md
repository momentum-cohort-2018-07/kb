# Rails resourceful routing and CRUD

```ruby
# config/routes.rb
Rails.application.routes.draw do
  resources :albums
end
```

`resources` will generate a route for each of the seven CRUD actions with a single line of code.

1. `index`

   ```ruby
     get '/albums', to: 'albums#index'
   ```

  - `GET www.recordcollection.com/albums`
  - Used to display a list of albums
----
2. `show`

   ```ruby
     get '/albums/:id', to: 'albums#show'
   ```

  - `GET www.recordcollection.com/albums/12`
  - Used to display a specific album
----
3. `new`

   ```ruby
     get '/albums', to: 'albums#new'
   ```

  - `GET www.recordcollection.com/albums`
  - Used to display a form for creating a new album
----
4. `create`

   ```ruby
     post '/albums', to: 'albums#create'
   ```

  - `POST www.recordcollection.com/albums`
  - The `new` form action submits here; used to save the new object to the database.
----
5. `edit`

   ```ruby
     get '/albums/:id', to: 'albums#edit'
   ```

  - `GET www.recordcollection.com/albums/15679`
  - Used to display a form to edit a single album
----
6. `update`

   ```ruby
     put '/albums/:id', to: 'albums#update'
   ```

  - `PUT www.recordcollection.com/albums`
  - The `edit` form action submits here; used to update a single album
----
7. `destroy`

   ```ruby
     delete '/albums/:id', to: 'albums#destroy'
   ```
  - `DELETE www.recordcollection.com/albums/756`
  - Used to destroy a single album