class SessionsController < ApplicationController

  def create
    redirect_to root_path, notice: 'You have successfully signed in!'
  end

  def destroy
    session[:github_uid] = nil
    redirect_to root_path, notice: "You are logged out!"
  end
end
