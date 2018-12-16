#PARA FUNCIONAR, DEVE-SE CRIAR OUTRO CLIENTE_secret COM OUTRAS CREDENCIAIS
import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
client = gspread.authorize(creds)

sheet = client.open('databasechallenge').sheet1

database = sheet.get_all_records()
print(database)