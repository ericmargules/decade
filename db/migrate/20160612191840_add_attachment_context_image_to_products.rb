class AddAttachmentContextImageToProducts < ActiveRecord::Migration
  def self.up
    change_table :products do |t|
      t.attachment :context_image
    end
  end

  def self.down
    remove_attachment :products, :context_image
  end
end
