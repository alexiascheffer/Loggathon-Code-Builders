import json
import googlemaps
from math import sqrt

#Le o arquivo json cuspido pelo formulario online
entrada = json.loads(open(r'C:\Users\felip\Desktop\teste.json').read())

address = entrada["address"]
number = entrada["number"]
city = entrada["city"]

#Pega informacao adicional do endereco do proprietario da loja com o GoogleMaps API
gmaps = googlemaps.Client(key='AIzaSyB1S9WYDMHOuPJR8Vi6rAS9dDfvufwpy_M')
geocode_result = gmaps.geocode(address+" "+number+", "+city)
state = geocode_result[0]['address_components'][4]['long_name']

#Verifica se o sufixo do cep e rural.
cep = geocode_result[0]['address_components'][6]['long_name']
area_rural = False
if cep[-3:] == '899':
	area_rural = True

def address_valid():
	#latitude e longitude da loja do proprietario
	lat_client = geocode_result[0]['geometry']['location']['lat']
	lng_client = geocode_result[0]['geometry']['location']['lng']
	
	#latitude e longitude do centro da cidade
	citycode_result = gmaps.geocode("Centro ,"+city+", "+state)
	lat_centro = citycode_result[0]['geometry']['location']['lat']
	lng_centro = citycode_result[0]['geometry']['location']['lng']

	radius = 1.00 # em km

	city_point = [{'lat': lat_centro, 'lng': lng_centro}]
	test_point = [{'lat': lat_client, 'lng': lng_client}]

	a = city_point[0]['lat'] - test_point[0]['lat']
	b = city_point[0]['lng'] - test_point[0]['lng']
	c = sqrt(a * a  +  b * b)
	
	if c <= radius:
			return("dentro")
	else:
			return("fora")
			