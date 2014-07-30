# == Schema Information
#
# Table name: videos
#
#  id    :integer          not null, primary key
#  title :string(255)      not null
#  ytid  :string(255)      not null
#

class Video < ActiveRecord::Base
  validates :title, :ytid, :presence => true
  validates :ytid, :uniqueness => true
  
  has_many :video_taggings
  
  has_many(
    :tags, 
    :through => :video_taggings, 
    :source => :tag
  )
  
  has_many :video_plays
  
end 
