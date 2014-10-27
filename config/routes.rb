Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
  

  get '/login', to: 'sessions#new'
  
  get '/auth/:provider/callback', to: 'sessions#create'
  post '/auth/:provider/callback', to: 'sessions#create'

  get '/logout', to: 'sessions#destroy'

  root 'static_page#index'

  get "folders/:folder_id/contents", to: "folders#contents"
  resources :folders, only: [:index, :show, :create, :update, :destroy], defaults: {format: :json}
  resources :docs, defaults: {format: :json}
  get "docs/:id/download", to: "docs#download"

end
