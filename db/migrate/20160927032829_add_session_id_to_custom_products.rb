class AddSessionIdToCustomProducts < ActiveRecord::Migration
  def change
    add_column :custom_products, :session_id, :string
  end
end
