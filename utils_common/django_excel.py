# pyexcel_xlsx

from pyexcel_xlsx import save_data


def excel_export(filename, data):
    # data = [[1, 2, 'f'], [4, 5, 6], [7, 8, 9]]
    sheetx = {
        "huge": data
    }
    return save_data('%s.xlsx' % filename, sheetx)