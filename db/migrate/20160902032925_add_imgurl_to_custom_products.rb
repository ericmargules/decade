class AddImgurlToCustomProducts < ActiveRecord::Migration
  def change
    add_column :custom_products, :imgurl, :text, :limit => 1073741823
  end
end
