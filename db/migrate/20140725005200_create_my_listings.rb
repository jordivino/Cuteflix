class CreateMyListings < ActiveRecord::Migration
  def change
    create_table :my_listings do |t|
      t.integer :user_id
      t.integer :video_id
      
      t.timestamps
    end
    
    add_index :my_listings, :user_id
    add_index :my_listings, :video_id
  end
end
