# == Schema Information
#
# Table name: videos
#
#  id    :integer          not null, primary key
#  title :string(255)      not null
#  url   :string(255)      not null
#

class Video < ActiveRecord::Base
  validates :title, :url, :presence => true
  validates :url, :uniqueness => true
  
  has_many :video_taggings
  
  has_many(
    :tags, 
    :through => :video_taggings, 
    :source => :tag
  )
  
end 
