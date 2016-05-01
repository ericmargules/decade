class CustomProductsController < ApplicationController
  before_action :set_custom_product, only: [:show, :edit, :update, :destroy]

  layout "custom_products"

  # GET /custom_products
  # GET /custom_products.json
  def index
    @custom_products = CustomProduct.all
  end

  # GET /custom_products/1
  # GET /custom_products/1.json
  def show
  end

  # GET /custom_products/new
  def new
    
    current_user ? @user_id = current_user.id : @user_id = "Guest"
    @custom_product = CustomProduct.new
  
  end

  # GET /custom_products/1/edit
  def edit
  end

  # POST /custom_products
  # POST /custom_products.json
  def create

    @custom_product = CustomProduct.new(custom_product_params)
    current_user ? @user_id = current_user.id : @user_id = "Guest" 
    respond_to do |format|
      if @custom_product.save
        # I don't know what the following line of code does.
         # format.json { render :show, status: :created, location: @custom_product }
        format.html { redirect_to "/cart/#{@custom_product.id}", notice: 'Custom product was successfully created.' }

      else
        format.html { render :new }
        format.json { render json: @custom_product.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /custom_products/1
  # PATCH/PUT /custom_products/1.json
  def update
    respond_to do |format|
      if @custom_product.update(custom_product_params)
        format.html { redirect_to @custom_product, notice: 'Custom product was successfully updated.' }
        format.json { render :show, status: :ok, location: @custom_product }
      else
        format.html { render :edit }
        format.json { render json: @custom_product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /custom_products/1
  # DELETE /custom_products/1.json
  def destroy
    @custom_product.destroy
    respond_to do |format|
      format.html { redirect_to custom_products_url, notice: 'Custom product was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_custom_product
      @custom_product = CustomProduct.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def custom_product_params
      params.require(:custom_product).permit(:name, :category, :price, :user_id, :options)
    end
end
