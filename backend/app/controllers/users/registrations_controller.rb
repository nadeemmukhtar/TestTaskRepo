class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)
    if resource.password == resource.password_confirmation
      resource.username = params[:user][:username].downcase
      resource.save
      unless resource.errors.any?
        sign_in(resource_name, resource)
        json_response(resource, 'Signed Up Successfully', :ok)
      else
        puts resource.errors.full_messages
        json_error_response(resource.errors, "Signed Up Failed", :bad_request)
      end
    else
      json_error_response(nil, "Signed Up Failed! Password did not matched", :bad_request)
    end
  end

  protected

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name,:username, :role)
  end

end
