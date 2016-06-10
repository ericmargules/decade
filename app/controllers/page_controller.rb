class PageController < ApplicationController

  layout :resolve_layout

  def home
  end

  def custom
  end

  def about
  end

  def policies
  end

  def catalog
    if params[:category] == "Billfold" || params[:category] == "Card Wallet" || params[:category] == "ID Wallet" || params[:category] == "Notebook"
      @products = Product.where(:category => params[:category])
    else
	    @products = Product.all
      render :catalog
    end

  end

  private

  def resolve_layout
    case action_name
      when "home"
        "home"
      else
        "application"
    end 
  end

end
