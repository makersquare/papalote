class SessionsController < ApplicationController

  def new
    redirect_to '/auth/github'
  end

  def create
    # result = SignInUser.new(
    #   oauth_data: request.env['omniauth.auth']).exec

    # if result.ok?
    #   session[:user_id] = result.user.user_id
    #   session[:access_token] = result.oauth_token
    #   session[:admin] = result.is_admin
    #   redirect_to session.delete(:return_to) || root_path
    # else
    #   redirect_to "/signin"
    # end

    # redirect_to root_path, notice: 'You have successfully signed in!'
    @info = request.env['omniauth.auth']
    # binding.pry
    
    # @info = {
    #   omniauth_info: request.env['omniauth.auth']
    # }
  end

  def destroy
    session[:github_uid] = nil
    redirect_to root_path, notice: "You are logged out!"
  end
end
