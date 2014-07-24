class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      
      t.string :title, :null => false
      t.string :url, :null => false
      
    end
    
    add_index :videos, :url, :unique => true
  end
end
