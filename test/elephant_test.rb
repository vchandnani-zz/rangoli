require 'test_helper'

class ElephantTest < Minitest::Test

  def setup
    Elephant.destroy_all
  end

  def test_create_with_valid_name
    e = Elephant.create!(:name => "rangoli", :rider => "vinny", :passengers => "bobby")
    assert !e.id.nil?
    assert_equal "rangoli", e.name
  end

  def test_create_with_nil_name
    e = Elephant.create(:rider => "vinny", :passengers => "bobby")
    assert_equal nil, e.id
    assert_equal "cannot be blank.", e.errors.messages[:name][0]
  end

  def test_create_with_blank_name
    e = Elephant.create(:name => "", :rider => "vinny", :passengers => "bobby")
    assert_equal nil, e.id
    assert_equal "cannot be blank.", e.errors.messages[:name][0]
  end

end
