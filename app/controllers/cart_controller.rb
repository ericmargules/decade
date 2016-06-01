class CartController < ApplicationController
  
  before_action :cleanup_cart, only: [:index]

  def add
  	id = params[:id]
  	if session[:cart]
  		cart = session[:cart]
  	else
  		session[:cart] = {}
  		cart = session[:cart]
  	end

  	if cart[id]
  		cart[id] += 1
  	else
  		cart[id] = 1
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
  	else
  		@cart = {}
  	end
  end

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
