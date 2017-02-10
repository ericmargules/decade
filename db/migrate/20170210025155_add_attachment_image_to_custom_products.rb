class AddAttachmentImageToCustomProducts < ActiveRecord::Migration
  def self.up
    change_table :custom_products do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :custom_products, :image
  end
end
