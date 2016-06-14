class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]

  layout :resolve_layout

  # GET /products
  # GET /products.json
  def index
    if current_user.try(:admin?)
      @products = Product.all
    else
      redirect_to root_path
    end
  end

  # GET /products/1
  # GET /products/1.json
  def show
  end

  # GET /products/new
  def new
    if current_user.try(:admin?)
      @product = Product.new
    else
      redirect_to root_path
    end
  end

  # GET /products/1/edit
  def edit
    if current_user.try(:admin?)
    else
      redirect_to root_path
    end
  end

  # POST /products
  # POST /products.json
  def create
    if current_user.try(:admin?)
      @product = Product.new(product_params)

      respond_to do |format|
        if @product.save
          format.html { redirect_to @product, notice: 'Product was successfully created.' }
          format.json { render :show, status: :created, location: @product }
        else
          format.html { render :new }
          format.json { render json: @product.errors, status: :unprocessable_entity }
        end
      end
    else
      redirect_to root_path
    end
  end

  # PATCH/PUT /products/1
  # PATCH/PUT /products/1.json
  def update
    if current_user.try(:admin?)
      respond_to do |format|
        if @product.update(product_params)
          format.html { redirect_to @product, notice: 'Product was successfully updated.' }
          format.json { render :show, status: :ok, location: @product }
        else
          format.html { render :edit }
          format.json { render json: @product.errors, status: :unprocessable_entity }
        end
      end
    else
      redirect_to root_path
    end
  end

  # DELETE /products/1
  # DELETE /products/1.json
  def destroy
    if current_user.try(:admin?)
      @product.destroy
      respond_to do |format|
        format.html { redirect_to products_url, notice: 'Product was successfully destroyed.' }
        format.json { head :no_content }
      end
    else
      redirect_to root_path
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def product_params
      params.require(:product).permit(:name, :short_description, :long_description, :price, :category, :dimensions, :stock, :tags, :main_image, :interior_image, :context_image)
    end

    def resolve_layout
      case action_name
      when "show"
        "product"
      else
        "application"
      end
    end
end
