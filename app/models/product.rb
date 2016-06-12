class Product < ActiveRecord::Base

  has_attached_file :main_image, styles: { large: "600x600>", medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :main_image, content_type: /\Aimage\/.*\Z/
  has_attached_file :interior_image, styles: { large: "600x600>", medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :interior_image, content_type: /\Aimage\/.*\Z/
  has_attached_file :context_image, styles: { large: "600x600>", medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :context_image, content_type: /\Aimage\/.*\Z/

end
