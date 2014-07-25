# == Schema Information
#
# Table name: my_listings
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  video_id   :integer
#  created_at :datetime
#  updated_at :datetime
#

class MyListing < ActiveRecord::Base
  validates :video_id, :user_id, :presence => true
  validates :video_id, :uniqueness => {:scope => :user_id}
  
  belongs_to :video 
  belongs_to :user
  
end 
