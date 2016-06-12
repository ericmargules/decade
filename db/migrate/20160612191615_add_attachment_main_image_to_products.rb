class AddAttachmentMainImageToProducts < ActiveRecord::Migration
  def self.up
    change_table :products do |t|
      t.attachment :main_image
    end
  end

  def self.down
    remove_attachment :products, :main_image
  end
end
