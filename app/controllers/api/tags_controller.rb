class Api::TagsController < ApplicationController

  def index
    @tags = Tag.includes(:videos).order("tags.id ASC, video_taggings.id DESC")
    render :index
  end 
  
  def show
    @tag = Tag.includes(:videos).find(params[:id])
    render :show
  end 

end 