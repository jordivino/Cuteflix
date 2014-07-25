class Api::VideosController < ApplicationController

  def index
    @videos = Video.includes(:tags)
    render :index
  end 

  def show
    @video = Video.includes(:tags).find(params[:id])
    render :show
  end 
  
  def my_list
    @my_list_videos = current_user.my_list_videos
    render :json => @my_list_videos
  end

end 
  