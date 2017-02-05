class Payment < PayPal::SDK::REST::Payment
  include ActiveModel::Validations
 	
 	def create
    return false if invalid?
    super
  end

  def error=(error)
    error["details"].each do |detail|
      errors.add detail["field"], detail["issue"]
    end if error and error["details"]
    super
  end


  def add_payment_method(order)
    self.payer.payment_method = "paypal"
  end

  def order=(order)
    list = []
    order.item_list.split("&").each do |array|
      hash = {}
      item = array.split(",")
      hash[:name] = item[0]
      hash[:sku] = item[1]
      hash[:price] = item[2]
      hash[:currency] = "USD"
      hash[:quantity] = item[3]
      list << hash
    end
    self.intent = "sale"
   	add_payment_method(order)
    self.transactions = [{
      :item_list => {
        :items => list
      },
      :amount => {
        :total => order.amount,
        :currency => "USD" },
      :description => order.description
     }]
     self.redirect_urls = {
       :return_url => order.return_url.sub(/:order_id/, order.id.to_s),
       :cancel_url => order.cancel_url.sub(/:order_id/, order.id.to_s)
     }
  end

end
