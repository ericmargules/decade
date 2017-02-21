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

ActiveRecord::Schema.define(version: 20170221025426) do

  create_table "custom_products", force: :cascade do |t|
    t.string   "name",               limit: 255
    t.string   "category",           limit: 255
    t.decimal  "price",                                 precision: 10
    t.string   "user_id",            limit: 255
    t.text     "options",            limit: 65535
    t.datetime "created_at",                                           null: false
    t.datetime "updated_at",                                           null: false
    t.integer  "stock",              limit: 4
    t.text     "imgurl",             limit: 4294967295
    t.string   "session_id",         limit: 255
    t.string   "image_file_name",    limit: 255
    t.string   "image_content_type", limit: 255
    t.integer  "image_file_size",    limit: 4
    t.datetime "image_updated_at"
  end

  create_table "orders", force: :cascade do |t|
    t.string   "user",           limit: 255
    t.string   "payment_id",     limit: 255
    t.string   "amount",         limit: 255
    t.string   "description",    limit: 255
    t.string   "state",          limit: 255
    t.string   "payment_method", limit: 255
    t.string   "return_url",     limit: 255
    t.string   "cancel_url",     limit: 255
    t.text     "item_list",      limit: 65535
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.string   "session_id",     limit: 255
    t.boolean  "shipped"
    t.string   "tracking",       limit: 255
    t.string   "address",        limit: 255
  end

  create_table "products", force: :cascade do |t|
    t.string   "name",                        limit: 255
    t.string   "short_description",           limit: 255
    t.text     "long_description",            limit: 65535
    t.decimal  "price",                                     precision: 10
    t.string   "category",                    limit: 255
    t.string   "dimensions",                  limit: 255
    t.integer  "stock",                       limit: 4
    t.string   "tags",                        limit: 255
    t.datetime "created_at",                                               null: false
    t.datetime "updated_at",                                               null: false
    t.string   "main_image_file_name",        limit: 255
    t.string   "main_image_content_type",     limit: 255
    t.integer  "main_image_file_size",        limit: 4
    t.datetime "main_image_updated_at"
    t.string   "interior_image_file_name",    limit: 255
    t.string   "interior_image_content_type", limit: 255
    t.integer  "interior_image_file_size",    limit: 4
    t.datetime "interior_image_updated_at"
    t.string   "context_image_file_name",     limit: 255
    t.string   "context_image_content_type",  limit: 255
    t.integer  "context_image_file_size",     limit: 4
    t.datetime "context_image_updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "",    null: false
    t.string   "encrypted_password",     limit: 255, default: "",    null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
    t.string   "username",               limit: 255
    t.boolean  "admin",                              default: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
