class CustomProduct < ActiveRecord::Base
  has_attached_file :image, styles: { default: "667×500>", thumb: "133x100>" }, default_url: "/images/:style/missing.png"
  # validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]
end
