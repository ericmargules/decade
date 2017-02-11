require "base64"

class CustomProductsController < ApplicationController
  before_action :set_custom_product, only: [:show, :edit, :update, :destroy]

  layout :resolve_layout

  # GET /custom_products
  # GET /custom_products.json
  def index
    if current_user.try(:admin?)
      @custom_products = CustomProduct.all
    else
      redirect_to root_path
    end
  end

  # GET /custom_products/1
  # GET /custom_products/1.json
  def show
  end

  # GET /custom_products/new
  def new
    if params[:category] == "Billfold" || params[:category] == "Card Wallet" || params[:category] == "ID Wallet" || params[:category] == "Notebook"
      @category = params[:category]
    else
      redirect_to :controller => :page, :action => :custom
    end

    current_user ? @user_id = current_user.id : @user_id = "Guest"
    @custom_product = CustomProduct.new
  
  end

  def edit
    if @custom_product.stock == 0
      redirect_to root_path
    elsif @custom_product.user_id != "Guest" && current_user.id.to_s != @custom_product.user_id
      redirect_to root_path
    elsif @custom_product.user_id == "Guest" && @custom_product.session_id != session.id
      redirect_to root_path
    end
    @category = @custom_product.category
    @options = @custom_product.options
    @options[-2..-1] = ""
  end

  def create
    @custom_product = CustomProduct.new(custom_product_params)
    current_user ? @user_id = current_user.id : @user_id = "Guest" 
    respond_to do |format|
      if @custom_product.save
        @custom_product.session_id = session.id 
        data = @custom_product.imgurl
        img_url = "/system/custom_products/images/custom_product_#{@custom_product.id}_#{Time.now.to_s[(0..9)]}.png"
        image_data = Base64.decode64(data['data:image/png;base64,'.length .. -1])
        File.open(("#{Rails.root}/public" + img_url), 'wb') do |f|
          f.write image_data
        end
        # image_url = ("").to_s
        # image_url = ("https://decadeleather.herokuapp.com" + img_url).to_s
        # @custom_product.image_from_url(image_url)
        @custom_product.imgurl = img_url
        @custom_product.save
        format.html { redirect_to "/cart/#{@custom_product.id}?type=custom_product", notice: 'Custom product was successfully created.' }
      else
        format.html { render :new }
        format.json { render json: @custom_product.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @custom_product.update(custom_product_params)
        current_user ? @custom_product.user_id = current_user.id : @custom_product.user_id = "Guest"
        data = @custom_product.imgurl
        img_url = "/system/custom_products/images/custom_product_#{@custom_product.id}_#{Time.now.to_s[(0..9)]}.png"
        image_data = Base64.decode64(data['data:image/png;base64,'.length .. -1])
        @custom_product.image = File.open(("#{Rails.root}/public" + img_url), 'wb') do |f|
          f.write image_data
        end
        @custom_product.imgurl = img_url
        @custom_product.save

        format.html { redirect_to cart_path, notice: 'Custom product was successfully updated.' }
        # format.json { render :show, status: :ok, location: @custom_product }
      else
        format.html { render :edit }
        format.json { render json: @custom_product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /custom_products/1
  # DELETE /custom_products/1.json
  def destroy
    if current_user.try(:admin?)
      @custom_product.destroy
      respond_to do |format|
        format.html { redirect_to custom_products_url, notice: 'Custom product was successfully destroyed.' }
        format.json { head :no_content }
      end
    else
      redirect_to root_path
    end 
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_custom_product
      @custom_product = CustomProduct.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def custom_product_params
      params.require(:custom_product).permit(:name, :category, :price, :user_id, :options, :stock, :imgurl, :session_id, :image)
    end

    def resolve_layout
      case action_name
      when "new", "create", "edit"
        "custom_products"
      else
        "application"
      end
    end
end
