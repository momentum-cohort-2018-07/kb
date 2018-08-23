Rails.application.routes.draw do
  resources :cats

  # The pattern the actions follow is:
  # lowercase_controller_name#action
  root "users#index"

  resources :books
  # resources :users

  get "/users" => "users#index"
  get "/users/:id" => "users#show"
  get "/users/new" => "users#new"
  post "/users" => "users#create"
  get "/users/:id/edit" => "users#edit"
  put "/users/:id" => "users#update"
  delete "/users/:id" => "users#destroy"

  get "secrets" => "secret_documents#show"
end
