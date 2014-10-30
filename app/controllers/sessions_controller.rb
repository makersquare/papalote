class SessionsController < ApplicationController

  def new
    redirect_to '/auth/github'
  end

  def create
    # This assigns the hash from Github into an auth variable. 
    # It then checks if a user exists and if not, it calls the create_user(auth) method .
    # It sets the session[:user_id] to the users id and redirects back to the homepage with a notice of "Signed in!".
    auth = request.env["omniauth.auth"]
    user = User.where(github_uid: auth['uid']).first || User. create_user(auth)
    session[:user_id] = user.id
    redirect_to root_path 
  end
  
  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: "You are logged out!"
  end
end
