class RenameUrlToYTid < ActiveRecord::Migration
  def change
    rename_column :videos, :url, :ytid
  end
end
