import * as XLSX from 'xlsx';

interface IPieChartDataItem {
  name: string;
  y: number;
  films: string[];
}

export function exportPieChartToExcel(
  data: IPieChartDataItem[],
  filename = 'films-distribution.xlsx'
) {
  const excelData = data.map((item) => ({
    'Character Name': item.name,
    'Number of Films': item.y,
    Films: item.films.join(', ')
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Films Distribution');

  const colWidths = [
    { wch: 20 }, // Character Name
    { wch: 15 }, // Number of Films
    { wch: 50 } // Films
  ];
  worksheet['!cols'] = colWidths;

  XLSX.writeFile(workbook, filename);
}
