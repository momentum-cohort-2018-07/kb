class ExpensiveReportJob < ApplicationJob
  queue_as :default

  def perform(report)
    # We are not implementing the logic here, but assume it is
    # something time-consuming, like a long-running query or
    # processing a file in some way
    # the sleep method will stand in for the time it takes
    sleep(3)
    report.update!(completed_at: Time.now, url:'www.example.com')
  end
end
