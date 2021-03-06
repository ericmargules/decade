class AddAttachmentInteriorImageToProducts < ActiveRecord::Migration
  def self.up
    change_table :products do |t|
      t.attachment :interior_image
    end
  end

  def self.down
    remove_attachment :products, :interior_image
  end
end
