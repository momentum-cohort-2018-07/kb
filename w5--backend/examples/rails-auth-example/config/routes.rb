Rails.application.routes.draw do
  # get '/login' => 'sessions#new'
  # post '/login' => 'sessions#create'
  resource :session, only: [:new, :create, :destroy]
  root 'welcome#index'
end
