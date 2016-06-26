class AddSessionIdToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :session_id, :integer
  end
end
