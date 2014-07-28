class CreateVideoPlay < ActiveRecord::Migration
  def change
    create_table :video_plays do |t|
      t.integer :video_id, :null => false
      t.integer :user_id, :null => false
    end
    
    add_index :video_plays, :video_id
    add_index :video_plays, :user_id
  end
end
