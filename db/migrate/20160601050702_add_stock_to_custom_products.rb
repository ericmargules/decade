class AddStockToCustomProducts < ActiveRecord::Migration
  def change
    add_column :custom_products, :stock, :integer
  end
end
