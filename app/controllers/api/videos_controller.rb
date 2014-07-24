class Api::VideosController < ApplicationController

  def index
    @videos = Video.includes(:tags)
    render :index
  end 

  def show
    @video = Video.includes(:tags).find(params[:id])
    render :show
  end 

end 
  
