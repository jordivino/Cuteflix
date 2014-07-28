class VideoPlay < ActiveRecord::Base
  
  validates :video_id, :user_id, :presence => true
  
  belongs_to :user
  belongs_to :video
end
