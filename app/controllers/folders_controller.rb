class FoldersController < ApplicationController

  def index
    @folders = Folder.all
    render json: @folders
  end

  def show
    @folder = Folder.find(params[:id])
    render json: @folder
  end

  def create
    @folder = Folder.new(folder_params)

    if @folder.save
      format.json { render :show }
    else
      format.json { render json: @folder.errors }
    end
  end

  def update
    respond_to do |format|
      if @folder.update(folder_params)
        format.json { render :show}
      else
        format.json { render json: @folder.errors}
      end
    end
  end

  def destroy
    @folder.destroy
  end

  private

  def folder_params
    params.require(:folder).permit(:name)
  end

end
