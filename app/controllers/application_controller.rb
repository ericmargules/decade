class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :configure_permitted_parameters, if: :devise_controller?


  protect_from_forgery with: :exception

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :password, :password_confirmation, :remember_me) }
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:login, :username, :email, :password, :remember_me) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:username, :email, :password, :password_confirmation, :current_password) }
  end

  def check_stock(cart)
    go_on = ""
    cart.each do |item, array|
      if array[1] == "product"
        if Product.find(item).stock < array[0] 
          cart.delete(item)
          go_on = false
        end
      elsif array[1] == "custom_product"
        if CustomProduct.find(item).stock < array[0] 
          cart.delete(item)
          go_on = false
        end
      end
    end
    if go_on == false
      redirect_to cart_path , notice: 'Some items in your cart are no longer available.'
      return false
    end
  end

end
