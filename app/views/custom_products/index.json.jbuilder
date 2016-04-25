json.array!(@custom_products) do |custom_product|
  json.extract! custom_product, :id, :name, :category, :price, :user_id, :options
  json.url custom_product_url(custom_product, format: :json)
end
