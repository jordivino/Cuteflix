Cuteflix::Application.routes.draw do
  root :to => "static_pages#root"

  resources :users, :only => [:new, :create] 
  resource :session, :only => [:new, :create, :destroy] do 
    member do 
      post :guest
    end 
  end 
  
  namespace :api, :defaults => {:format => :json} do 
    resources :videos, :only  => [:show, :index] do 
      member do 
        get :add_my_list
        get :remove_my_list
        get :add_recent
      end 
    end 
    resources :tags, :only => [:show, :index] 
  end 
end
