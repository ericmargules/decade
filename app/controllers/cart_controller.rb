class CartController < ApplicationController
  
  before_action :cleanup_cart, only: [:index]

  def add
  	id = params[:id]
    type = params[:type]
  	
    if session[:cart]
  		cart = session[:cart]
  	else
  		session[:cart] = {}
  		cart = session[:cart]
  	end

  	if cart[id]
  		if type == "product"
        Product.find(id).stock >= (cart[id][0] + 1) ? cart[id][0] += 1 : cart[id][0]
      elsif type == "custom_product"
        CustomProduct.find(id).stock >= (cart[id][0] + 1) ? cart[id][0] += 1 : cart[id][0]
      end
      # cart[id][0] += 1
  	else
  		cart[id] = [1, type]
  	end
  	redirect_to :action => :index
  end

  def remove
    id = params[:id]
    cart = session[:cart]
    cart.delete(id)
    redirect_to :action => :index
  end


  def clear_cart
  	session[:cart] = nil
  	redirect_to :action => :index
  end

  def index
    if session[:cart]
      @cart = session[:cart]
      check_stock(@cart)
    else
  		@cart = {}
  	end
  end

  def checkout_verify
    if session[:cart] && session[:cart] != {}
      if current_user
        redirect_to :action => :index
      end
      @cart = session[:cart]
    else
      redirect_to :action => :index
    end
  end

  private 

  def cleanup_cart
    if session[:cart]
      session[:cart].each do |id, quantity|
        if !Product.find_by_id(id) && !CustomProduct.find_by_id(id) 
          session[:cart].delete(id) 
        end
      end
    end
  end

end
