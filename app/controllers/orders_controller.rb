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

  def execute
    order = Order.find(params[:order_id])
    if order.execute(params["PayerID"])
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
    if Order.find(params[:id]).user
	    @order = Order.find(params[:id])
    else
      redirect_to root_path
    end  
  end

  private

  def order_params
  	params.permit(:amount, :description, :state, :item_list, :payment_method, :return_url, :cancel_url, :payment_id, :user, :session_id)
  end

end
