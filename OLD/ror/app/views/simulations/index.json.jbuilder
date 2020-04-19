json.array!(@simulations) do |simulation|
  json.extract! simulation, :id, :at, :totalValue, :rate, :years, :monthlyCost, :totalCost, :monthlytotalCost, :costRate
  json.url simulation_url(simulation, format: :json)
end
