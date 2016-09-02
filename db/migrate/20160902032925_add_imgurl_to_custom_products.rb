class AddImgurlToCustomProducts < ActiveRecord::Migration
  def change
    add_column :custom_products, :imgurl, :text, :limit => 4294967295
  end
end
