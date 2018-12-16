import json
import googlemaps
from math import sqrt

#Le o arquivo json cuspido pelo formulario online
#entrada = json.loads(open(r'C:\Users\felip\Desktop\teste.json').read())

def validar_endereco(address, number, city):
	import planilha

	#Pega informacao adicional do endereco do proprietario da loja com o GoogleMaps API
	gmaps = googlemaps.Client(key='AIzaSyB1S9WYDMHOuPJR8Vi6rAS9dDfvufwp') #essa chave não funciona. Gerar outra para funcionar
	geocode_result = gmaps.geocode(address+" "+number+", "+city)
	state = geocode_result[0]['address_components'][4]['long_name']

	#latitude e longitude da loja do proprietario
	lat_client = geocode_result[0]['geometry']['location']['lat']
	lng_client = geocode_result[0]['geometry']['location']['lng']
	
	#latitude e longitude do centro da cidade
	citycode_result = gmaps.geocode("Centro ,"+city+", "+state)
	lat_centro = citycode_result[0]['geometry']['location']['lat']
	lng_centro = citycode_result[0]['geometry']['location']['lng']

	radius = planilha.raio(city) / 100000 # em km

	city_point = [{'lat': lat_centro, 'lng': lng_centro}]
	test_point = [{'lat': lat_client, 'lng': lng_client}]

	a = city_point[0]['lat'] - test_point[0]['lat']
	b = city_point[0]['lng'] - test_point[0]['lng']
	c = sqrt(a * a  +  b * b)
	c = c*100
	print(c)
	
	#Verifica se a loja esta dentro do raio
	if c < radius:
			return(True)
	return(False)

def main(x):
	entrada = json.loads(x)

	address = entrada["enderecoRua"]["value"]
	number = entrada["enderecoNumero"]["value"]
	city = entrada["cidade"]["value"]
	name = entrada["nome"]["value"]

	#Verifica se o sufixo do cep e rural.
	cep = entrada["CEP"]["value"]
	enderecoValido = False
	if cep[-3:] != '899':
		enderecoValido = validar_endereco(address, number, city)
		
	resultado = {
	'showAccepted' : enderecoValido,
	'registerStatus' : enderecoValido,
	'clientName' : name,
	}

	return resultado