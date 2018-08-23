class SecretDocumentsController < ApplicationController
  before_action :authenticate_user!
  before_action :check_permissions

  def check_permissions
    # @page = Page.find(params[:id])
    unless can_view_page?
      redirect_to unauthorized_path
    end
  end

  def show
    # Show the super-secret document
    render html: ("<h1>SECRETS REVEALED</h1>")
  end

private

  def can_view_page?
    true
    # Fancy code to check if a user can view the page
  end

  def authenticate_user!
    true
  end
end
