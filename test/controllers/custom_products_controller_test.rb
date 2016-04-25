require 'test_helper'

class CustomProductsControllerTest < ActionController::TestCase
  setup do
    @custom_product = custom_products(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:custom_products)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create custom_product" do
    assert_difference('CustomProduct.count') do
      post :create, custom_product: { category: @custom_product.category, name: @custom_product.name, options: @custom_product.options, price: @custom_product.price, user_id: @custom_product.user_id }
    end

    assert_redirected_to custom_product_path(assigns(:custom_product))
  end

  test "should show custom_product" do
    get :show, id: @custom_product
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @custom_product
    assert_response :success
  end

  test "should update custom_product" do
    patch :update, id: @custom_product, custom_product: { category: @custom_product.category, name: @custom_product.name, options: @custom_product.options, price: @custom_product.price, user_id: @custom_product.user_id }
    assert_redirected_to custom_product_path(assigns(:custom_product))
  end

  test "should destroy custom_product" do
    assert_difference('CustomProduct.count', -1) do
      delete :destroy, id: @custom_product
    end

    assert_redirected_to custom_products_path
  end
end
