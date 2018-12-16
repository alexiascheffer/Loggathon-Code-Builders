from flask import Flask, request
import pontos_acesso

app = Flask(__name__)
app.debug = True

@app.route("/", methods=['POST'])
def index():
	resultado = str(pontos_acesso.main(request.data))
	print(resultado)
	
	return resultado

if __name__ == "__main__":
	app.run()