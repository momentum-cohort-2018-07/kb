Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  get 'items/index'
  get 'items/show'
  get 'items/create'
  get 'items/new'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
