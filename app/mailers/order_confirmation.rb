class OrderConfirmation < ApplicationMailer
	def email_user(user)
		@user = user
		mail(to: @user.email, subject: "Decade Order Confirmation!")
	end
end
