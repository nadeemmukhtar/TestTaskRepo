class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    json_response(resource, "Login successfully", :ok)
  end
  
  def respond_to_on_destroy
    head :ok
  end

end
