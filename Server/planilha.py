import xlrd

def raio(city):
	sheet_data = []   
	wb = xlrd.open_workbook(r"databasechallenge.xlsx")
	p = wb.sheet_names()
	sh = wb.sheet_by_name("Sheet1")
	for rownum in range(sh.nrows):
		sheet_data.append((sh.row_values(rownum)))

	population = ''
	dado =''
	for l in range(len(sheet_data)):
		dado = sheet_data[l+1][1]
		if city in dado:
			population = sheet_data[l+1][5]
			break
	
	return population