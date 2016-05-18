class PageController < ApplicationController
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

end
