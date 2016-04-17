require 'test_helper'

class PageControllerTest < ActionController::TestCase
  test "should get home" do
    get :home
    assert_response :success
  end

  test "should get custom" do
    get :custom
    assert_response :success
  end

  test "should get about" do
    get :about
    assert_response :success
  end

end
