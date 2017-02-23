class CartController < ApplicationController
  
  before_action :cleanup_cart, only: [:index]
  
  layout :resolve_layout

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
        redirect_to :action => :checkout_info, level: "Verified"
      else
        check_stock(session[:cart])
      end
    else
      redirect_to :action => :index
    end
  end

  def checkout_info
    if params[:level] == "Verified" && session[:cart] && session[:cart] != {}
      if current_user
        check_stock(session[:cart])
        @user = current_user
      end
      if params[:address]
        @address = params[:address]
      end
    else
        redirect_to :action => :index
    end
  end

  def checkout_confirm
    if params[:level] == "Verified" && params[:address] && session[:cart] && session[:cart] != {}
        @cart = session[:cart]
        check_stock(@cart)
        @address = params[:address]
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
  
  def resolve_layout
    case action_name
      when "checkout_info"
        "checkout"
      else
        "application"
    end 
  end

end
