Cuteflix::Application.routes.draw do
  root :to => "static_pages#root"

  resources :users, :only => [:new, :create, :show]
  resource :session, :only => [:new, :create, :destroy]
  
  namespace :api, :defaults => {:format => :json} do 
    resources :videos, :only  => [:show, :index] do 
      resources :tags, :only => [:index]
    end 
  end 
end
