class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  # include ActionController::HttpAuthentication::Basic::ControllerMethods

  before_action :verify_authentication
  # before_action :authenticate

  # def authenticate
  #   authenticate_or_request_with_http_basic do |username, password|
  #     username == "amy" && password == "password"
  #   end
  # end

  def verify_authentication
    user = authenticate_with_http_token do |token, options|
      User.find_by_api_token(token)
    end

    unless user
      render json: { error: "You don't have permission to access these resources" }, status: :unauthorized
    end
  end

end
