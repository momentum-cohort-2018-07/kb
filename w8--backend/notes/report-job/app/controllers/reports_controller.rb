class ReportsController < ApplicationController
  def new
  end

  def create
    report = Report.create!
    # pass the report instance to the job
    ExpensiveReportJob.perform_later(report)
    redirect_to report_path(report)
  end

  def show
    @report = Report.find(params[:id])
    if request.xhr?
      # ActionController#head returns a response that has only a headerr
      # http://api.rubyonrails.org/classes/ActionController/Head.html#method-i-head
      if @report.ready?
        head :ok
      else
        head :processing
      end
    end
  end
end
