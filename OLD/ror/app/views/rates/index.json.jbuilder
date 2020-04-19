json.array!(@rates) do |rate|
  json.extract! rate, :id, :date, :years, :rate
  json.url rate_url(rate, format: :json)
end
