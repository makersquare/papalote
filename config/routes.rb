Rails.application.routes.draw do
  get 'sessions/new'

  get 'sessions/create'

  get 'sessions/destroy'

  resources :users

  # this URL needs to match the github callback url we set when creating our Github client ID and token
  get '/auth/github/callback', to: 'sessions#create'

  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
  root 'static_page#index'

  get "folders/:folder_id/docs", to: "docs#index"
  resources :folders, only: [:index, :show, :create, :update, :destroy], defaults: {format: :json}
  resources :docs, defaults: {format: :json}

end
