# We made this controller just for checking authorization

class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  
  def index
    json_response(User.all, "all users", :ok)
  end
end
