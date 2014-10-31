class UsersController < ApplicationController

  def show
    current_user = User.retrieve_user(session[:user_id])
    session[:user_id] = current_user.id
    render json: current_user
  end
end