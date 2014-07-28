class AddTimestampsToVideoPlays < ActiveRecord::Migration
  def change
    add_column :video_plays, :created_at, :datetime
    add_column :video_plays, :updated_at, :datetime 
  end
end
