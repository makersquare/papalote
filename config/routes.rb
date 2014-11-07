Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  get '/search/:keywords', to: 'search#index'

  get '/login', to: 'sessions#new'

  get '/auth/:provider/callback', to: 'sessions#create'
  post '/auth/:provider/callback', to: 'sessions#create'

  get '/user', to: "users#show"

  get '/logout', to: 'sessions#destroy'

  root 'static_page#index'

  get "folders/:folder_id/contents", to: "folders#contents"
  resources :folders, only: [:index, :show, :create, :update, :destroy], defaults: {format: :json}
  resources :docs, defaults: {format: :json}
  get "docs/:id/createDocFile", to: "docs#createDocFile"
  get "docs/:id/deleteDocFile", to: "docs#deleteDocFile"
  get '/users/current_user', to: 'users#current_user'
  get "users/:owner_id/contents", to: "users#user_contents"

end
