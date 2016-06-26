class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.string :user
      t.string :payment_id
      t.string :amount
      t.string :description
      t.string :state
      t.string :payment_method
      t.string :return_url
      t.string :cancel_url
      t.text :item_list

      t.timestamps null: false
    end
  end
end
