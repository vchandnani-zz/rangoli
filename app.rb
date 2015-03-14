require 'sinatra'
require 'sinatra/activerecord'
require './models/elephant'

get '/' do
  redirect '/index.html'
end

post '/elephants' do
  content_type :json
  params = JSON.parse(request.body.read)
  results = {}
  e = Elephant.create( :name => params["name"],
                       :rider => params["rider"],
                       :passengers => params["passengers"] )
  if e.id.nil?
    halt 400, { error: e.errors }.to_json
  end
  return results.to_json
end

get '/elephants' do
  content_type :json
	results = {}
	e = Elephant.all
	if e
		results = e
	else
		halt 403, {error: {elephants: ["not found."]}}.to_json
	end
	return results.to_json
end

get '/elephants/:id' do |id|
  content_type :json
	results = {}
	e = Elephant.where("id = '#{id}'").first
	if e
		results = e
	else
		halt 403, {error: {elephant: ["not found."]}}.to_json
	end
	return results.to_json
end

put '/elephants/:id' do |id|
	content_type :json
	params = JSON.parse(request.body.read)
	results = {}
	e = Elephant.where("id = '#{id}'").first
	if e.nil?
		halt 403, {error: {elephant: ["not found."]}}.to_json
	else
		e.update_attrs params
	end
  return results.to_json
end

delete '/elephants/:id' do |id|
	content_type :json
	results = {}
	e = Elephant.where("id = '#{id}'").first
	if e.nil?
		halt 403, {error: {elephant: ["not found."]}}.to_json
	else
		e_id = e.id
		e.destroy
    count = Elephant.where(id:e_id).count
		if count != 0
			halt 400, {error: {elephant: ["could not be deleted."]}}.to_json
		else
			results = {}
		end
	end
	return results.to_json
end
