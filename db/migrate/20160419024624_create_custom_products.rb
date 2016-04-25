class CreateCustomProducts < ActiveRecord::Migration
  def change
    create_table :custom_products do |t|
      t.string :name
      t.string :category
      t.decimal :price
      t.string :user_id
      t.text :options

      t.timestamps null: false
    end
  end
end
