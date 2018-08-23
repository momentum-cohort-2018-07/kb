class UsersController < ApplicationController

  def index
    @users = User.last(10)
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.save
    redirect_to root_path
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    @user.save
    redirect_to root_path
  end

private

  def user_params
    params.require(:user).permit(:name)
  end
end
