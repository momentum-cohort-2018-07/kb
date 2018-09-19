Rails.application.routes.draw do

  resources :search, only: [:index]
  resources :artists, only: [:index, :show]
end
