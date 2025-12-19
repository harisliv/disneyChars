import * as XLSX from 'xlsx';
import { handleError } from '../utils/error';
import { usePaginatedCharacters } from './usePaginatedCharacters';
import { useSnackbar } from './useSnackbar';
import { useCallback } from 'react';

export function useExportPie() {
  const { pieChartData } = usePaginatedCharacters();
  const { setSnackbar } = useSnackbar();

  const exportToExcel = useCallback(() => {
    try {
      const excelData = pieChartData.map((item) => ({
        'Character Name': item.name,
        'Number of Films': item.y,
        Films: item.films.join(', ')
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Films Distribution');

      const colWidths = [{ wch: 20 }, { wch: 15 }, { wch: 50 }];
      worksheet['!cols'] = colWidths;

      const filename = `films-distribution-${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, filename);

      setSnackbar({
        message: 'Excel file exported successfully',
        status: 'success',
        open: true
      });
    } catch (error) {
      const { message } = handleError(error);
      setSnackbar({ message, status: 'error', open: true });
    }
  }, [pieChartData, setSnackbar]);

  return exportToExcel;
}
