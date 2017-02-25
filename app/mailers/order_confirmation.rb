class OrderConfirmation < ApplicationMailer
	
	def email_confirmation(order)
		address = parse_address_hash(order.address)
		mail(to: address["email"], subject: "Decade Order Confirmation!")
	end

	def email_shipping(order)
		address = parse_address_hash(order.address)
		mail(to: address["email"], subject: "Your Decade Order Has Shipped!")
	end
	
	private

	def parse_address_hash(address)

		address_hash = {}
		address.split("__").each do |string|
			string2 = string.split("~~")
			address_hash[string2[0]] = string2[1] 
		end
		address_hash
	end

end
