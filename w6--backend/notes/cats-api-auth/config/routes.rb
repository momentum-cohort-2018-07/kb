Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :cats
      resource :session, only: :create
    end
  end
end
