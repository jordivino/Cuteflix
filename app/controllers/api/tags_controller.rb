class Api::TagsController < ApplicationController

  def index
    @tags = Tag.includes(:videos)
    render :index
  end 
  
  def show
    @tag = Tag.includes(:videos).find(params[:id])
    render :show
  end 

end 