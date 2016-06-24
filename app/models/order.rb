class Order < ActiveRecord::Base

  after_create :create_payment

  def payment
    @payment ||= payment_id && Payment.find(payment_id)
  end

  def create_payment
    @payment = Payment.new( :order => self )
    if @payment.create
      self.payment_id = @payment.id
      self.state      = @payment.state
      save
    else
      errors.add :payment_method, @payment.error["message"] if @payment.error
      raise ActiveRecord::Rollback, "An error occurred while placing your order!"
    end
  end

  def execute(payer_id)
    if payment.execute(:payer_id => payer_id)
      self.state = payment.state
      save
    else
      payment.error.inspect
      false
    end
  end

  def approve_url
    payment.links.find{|link| link.method == "REDIRECT" }.try(:href)
  end

end
