class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  after_filter :set_csrf_cookie_for_ng
  helper_method :current_user

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  rescue_from ActionController::InvalidAuthenticityToken do |exception|
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
    # render :error => 'Invalid authenticity token', {:status => :unprocessable_entity}
  end

  protected

  def verified_request?
    super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
  end

  def is_logged_in?
    !current_user.guest
  end

  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    elsif session[:guest_time]
      @guest_user
    else
      session[:guest_time] = Time.now.to_i.to_s
      @guest_user = {
        id: time,
        name: 'Guest' + session[:guest_time],
        guest: true
      }
    end
  end

  def index
    {id: current_user.id, name: current_user.name}
  end

end
