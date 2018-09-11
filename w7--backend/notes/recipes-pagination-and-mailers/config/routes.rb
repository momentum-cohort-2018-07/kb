Rails.application.routes.draw do
  get 'users/index'
  get 'users/show'
  get 'users/new'
  post 'users/create'
  resources :recipes
  root 'recipes#index'
end
