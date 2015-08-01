# == Schema Information
#
# Table name: video_taggings
#
#  id         :integer          not null, primary key
#  video_id   :integer
#  tag_id     :integer
#  created_at :datetime
#  updated_at :datetime
#

class VideoTagging < ActiveRecord::Base
  validates :video_id, :tag_id, :presence => true
  validates :video_id, :uniqueness => {:scope => :tag_id}

  belongs_to :video
  belongs_to :tag
end
