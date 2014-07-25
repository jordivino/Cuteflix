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
  
  def add_my_list
    video_id = params[:id]
    current_user.my_list_video_ids += [video_id]
    render :json => current_user.my_list_videos.includes(:tags)
  end 
  
  def remove_my_list
    video_id = params[:id]
    current_user.my_list_video_ids -= [video_id.to_i]
    render :json => current_user.my_list_videos.includes(:tags)
  end 


end 
  