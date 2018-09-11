class UsersController < ApplicationController
  def index
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      UserMailer.signup(@user).deliver_now
      redirect_to root_path
    else
      render :new
    end
  end

  private

  def user_params
    params.permit(:email)
  end
end
