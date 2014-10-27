class SearchController < ApplicationController
  def index
    @folders = Folder.where(name: params[:keywords]) 
    @docs = Doc.where(name: params[:keywords])
  
    render json: {folders: @folders, docs: @docs}
  end
end
