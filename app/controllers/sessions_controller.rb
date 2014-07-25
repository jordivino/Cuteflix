class SessionsController < ApplicationController
  
  before_action :check_logged_in, :only => [:new, :create]
  
  
  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user.nil?
      flash[:errors] = ["Email or password are invalid"]
      render :new
    else 
      log_in!(@user)
    end 
  end 
  
  def destroy
    log_out!
  end 
  
  def new
  end
  

  private
  
  def user_params
    params.require(:user).permit(:email, :password)
  end 
  
  def check_logged_in
    if logged_in?
      redirect_to root_url
    end 
  end 
  

  
  
  
end 