class ApplicationController < ActionController::Base
  helper_method :current_user

  protected
    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end

  # def logged_in?
  #   !!current_user
  # end

  # def authenticate
  #   redirect_to login_path unless logged_in?
  # end
end
