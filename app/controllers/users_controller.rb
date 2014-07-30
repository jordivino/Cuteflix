class UsersController < ApplicationController
  
  before_action :check_logged_in, :only => [:new, :show, :create]

  
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
  
  def demo
    t = Time.new
    code = t.year.to_s + t.mon.to_s + t.day.to_s + t.hour.to_s + t.min.to_s + t.sec.to_s
    username = "Guest"
    email = "demo" + code + "@cuteflix.com"
    password = "password"
    @demo = User.new(
      :username => username, 
      :email => email,
      :password => password
    )
    
    @demo.save
    @demo.my_list_video_ids = [1, 2, 11, 14, 16]
    
    id = @demo.id
    VideoPlay.create({:user_id => id, :video_id => 17})
    VideoPlay.create({:user_id => id, :video_id => 1})
    VideoPlay.create({:user_id => id, :video_id => 11})
    VideoPlay.create({:user_id => id, :video_id => 13})
    VideoPlay.create({:user_id => id, :video_id => 16})
    @demo.save
    
    log_in!(@demo)
  end 

  
  private 
  
  def user_params
    params.require(:user).permit(:email, :password, :username)
  end 
  
  def check_logged_in
    if logged_in?
      redirect_to user_url(current_user)
    end 
  end 
end 