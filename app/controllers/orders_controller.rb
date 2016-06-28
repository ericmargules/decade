class OrdersController < ApplicationController

  def index
    if current_user.try(:admin?)
    	@orders = Order.all
    elsif user_signed_in?
	    	@orders = Order.where(user: current_user.id)
    else
      	redirect_to root_path
    end
  end

  def create
    @order = Order.new(order_params)
    @order.return_url = order_execute_url(":order_id")
    @order.cancel_url = order_cancel_url(":order_id")
    user_signed_in? ? @order.user = current_user.id.to_s : @order.user = "guest"
    @order.payment_method = "paypal"
    @order.shipped = false
    @order.session_id = session.id
    if user_signed_in? 
    	username = User.find(@order.user)
    	@order.description = "#{username.username}'s Order"
    else
    	@order.description = "Guest's Order"
    end
    if @order.payment_method && @order.save
      if @order.approve_url
        redirect_to @order.approve_url
      else
    		redirect_to root_path, :notice => "Your order has been placed!!"
      end
    else
      render :create, :alert  => @order.errors.to_a.join(", ")
    end
  end

  def edit
  	if current_user.try(:admin?)
  		@order = Order.find(params[:id])
  	else
  		redirect_to root_path
  	end
  end

  def update
    if current_user.try(:admin?)
   		@order = Order.find(params[:id])    
      # respond_to do |format|
      if @order.update(edit_order_params)
      	redirect_to @order, notice: 'Order was successfully updated.'
      else
      	render :edit
      end
      # end
    else
      redirect_to root_path
    end
  end

  def execute
    order = Order.find(params[:order_id])
    if order.execute(params["PayerID"])
    	update_stock(order)
    	session[:cart] = nil
    	redirect_to root_path, :notice => "Your order has been placed!"
    else
    	redirect_to root_path, :alert => order.payment.error.inspect
    end
  end

  def cancel
    order = Order.find(params[:order_id])
    unless order.state == "approved"
      order.state = "cancelled"
      order.save
    end
    	redirect_to root_path, :alert => "Your order was cancelled"
  end

  def show
    if params[:id] != "show"
	    if current_user.try(:admin?) || user_signed_in? && Order.find(params[:id]).user == current_user.id
		    @order = Order.find(params[:id])
	    elsif Order.find(params[:id]).session_id == session.id
	    	@order = Order.find(params[:id])
	    else
	      redirect_to root_path
	    end  
	  else
	      redirect_to root_path
    end
  end

  private

  def order_params
  	params.permit(:amount, :description, :state, :item_list, :payment_method, :return_url, :cancel_url, :payment_id, :user, :session_id, :shipped, :tracking)
  end
  
  def edit_order_params
  	params.require(:order).permit(:amount, :description, :state, :item_list, :payment_method, :return_url, :cancel_url, :payment_id, :user, :session_id, :shipped, :tracking)
  end

  def update_stock(order)
  	order.item_list.split("&").each do |array|
  		item_array = array.split(",")
  		sku_array = item_array[1].split(" - ")
  		if sku_array[0] == "product"
  			item = Product.find(sku_array[1])
  		elsif sku_array[0] == "custom_product"
  			item = CustomProduct.find(sku_array[1])
  		end
  		item.stock -= 1
  		item.save
  	end
  end
end
