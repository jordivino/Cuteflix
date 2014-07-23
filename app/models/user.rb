# require 'bcrpyt'

class User < ActiveRecord::Base
  validates :email, :password_digest, :session_token, :presence => true
  validates :email, :uniqueness => true
  
  before_validation :ensure_session_token
  
  attr_reader :password
  
  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end 
  
  def is_password?(secret)
    bcrypt_object = BCrypt::Password.new(password_digest)
    bcrypt_object.is_password?(secret)
  end 
  
  def password=(secret)
    @password = secret
    self.password_digest = BCrypt::Password.create(password)
  end 
  
  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end 
  
  def self.find_by_credentials(email, secret)
    user = User.find_by_email(email)
    return nil if user.nil?
    user.is_password?(secret)
    
    user
  end 
  
  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end 
  
  
end 