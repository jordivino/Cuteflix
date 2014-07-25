class Api::VideosController < ApplicationController

  def index
    if params[:my_list]
      @videos = current_user.my_list_videos.includes(:tags)
    else 
      @videos = Video.includes(:tags)
    end 
    render :index
  end 

  def show
    @video = Video.includes(:tags).find(params[:id])
    render :show
  end 


end 
  