json.array!(@products) do |product|
  json.extract! product, :id, :name, :short_description, :long_description, :price, :category, :dimensions, :stock, :tags
  json.url product_url(product, format: :json)
end
