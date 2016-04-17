class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :short_description
      t.text :long_description
      t.string :image_url
      t.decimal :price
      t.string :category
      t.string :dimensions
      t.integer :stock
      t.string :tags

      t.timestamps null: false
    end
  end
end
