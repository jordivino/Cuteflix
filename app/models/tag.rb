# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

class Tag < ActiveRecord::Base
  validates :name, :presence => true

  has_many :video_taggings
  has_many(
    :videos,
    :through => :video_taggings,
    :source => :video
  )
end
