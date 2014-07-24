class UsersController < ApplicationController
  
  before_action :check_logged_in, :only => [:new, :create]
  
  def create
    @user = User.new(user_params)
    
    if @user.save
      log_in!(@user)
    else 
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end 
  end 
  
  def new
    @user = User.new
  end 
  
  def show
    @user = User.find(params[:id])
  end 
  
  private 
  
  def user_params
    params.require(:user).permit(:email, :password)
  end 
  
  def check_logged_in
    if logged_in?
      redirect_to user_url(current_user)
    end 
  end 
end 