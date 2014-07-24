class CreateVideoTagging < ActiveRecord::Migration
  def change
    create_table :video_taggings do |t|
      t.integer :video_id
      t.integer :tag_id
      
      t.timestamps
    end
    
    add_index :video_taggings, :video_id
    add_index :video_taggings, :tag_id
  end
end
