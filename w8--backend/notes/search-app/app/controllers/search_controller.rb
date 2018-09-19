class SearchController < ApplicationController
  def index
    if search_params[:search_term].present?
     @results = Artist.search_all(search_params[:search_term])
   else
     @results = Artist.all
   end
  end

  private
    def search_params
      params.permit(:search_term)
    end
end
