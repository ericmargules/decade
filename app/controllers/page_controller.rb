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
  	    @products = Product.all
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
