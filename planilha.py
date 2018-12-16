import xlrd
import pontos_acesso

sheet_data = []   
wb = xlrd.open_workbook(r"C:\Users\Alexia\Documents\GitHub\Loggathon-Code-Builders\databasechallenge.xlsx")
p = wb.sheet_names()
sh = wb.sheet_by_name(y)
for rownum in xrange(sh.nrows):
    sheet_data.append((sh.row_values(rownum)))

population = ''
dado =''
for l in range(len(sheet_data)):
	dado = sheet_data[l+1][1]
	if pontos_acesso.city in dado:
		population = sheet_data[l+1][5]
		break