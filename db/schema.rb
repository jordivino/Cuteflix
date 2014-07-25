# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140725214257) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "my_listings", force: true do |t|
    t.integer  "user_id"
    t.integer  "video_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "my_listings", ["user_id"], name: "index_my_listings_on_user_id", using: :btree
  add_index "my_listings", ["video_id"], name: "index_my_listings_on_video_id", using: :btree

  create_table "tags", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "username"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

  create_table "video_taggings", force: true do |t|
    t.integer  "video_id"
    t.integer  "tag_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "video_taggings", ["tag_id"], name: "index_video_taggings_on_tag_id", using: :btree
  add_index "video_taggings", ["video_id"], name: "index_video_taggings_on_video_id", using: :btree

  create_table "videos", force: true do |t|
    t.string "title", null: false
    t.string "ytid",  null: false
  end

  add_index "videos", ["ytid"], name: "index_videos_on_ytid", unique: true, using: :btree

end
