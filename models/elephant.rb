class Elephant < ActiveRecord::Base

  validates :name, presence: {message: "cannot be blank."}
  validates :rider, presence: {message: "cannot be blank."}
  validates :passengers, presence: {message: "cannot be blank."}

  def save(*args)
    super
  rescue ActiveRecord::RecordNotUnique => error
    errors[:name] << "is not unique."
    false
  end

end
