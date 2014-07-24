class Api::TagsController < ApplicationController

  def index
    video = Video.find(params[:video_id])
    @tags = video.tags
    render :json => @tags
  end 

end 