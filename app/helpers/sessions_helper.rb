module SessionsHelper

  def current_user
    current_session_token = session[:session_token]
    User.find_by_session_token(current_session_token)
  end  

  def log_in!(user)
    session[:session_token] = user.reset_session_token!
    redirect_to root_url
  end 

  def log_out!
    current_user.reset_session_token!
    session[:session_token] = nil
    redirect_to new_session_url
  end 
  
  def logged_in?
    !current_user.nil?
  end 
  
  def require_user!
    redirect_to new_session_url if current_user.nil?
  end
  
end 