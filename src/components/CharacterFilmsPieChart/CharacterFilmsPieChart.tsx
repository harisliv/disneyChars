import { usePaginatedCharacters } from '@/hooks';
import { Chart, Series, Tooltip } from '@highcharts/react';
import type Highcharts from 'highcharts';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CardContainer, CardHeader } from '@/components/Card';
import { exportPieChartToExcel } from '@/utils/exportPie';

interface IPiePointWithFilms extends Highcharts.Point {
  films?: string[];
  percentage?: number;
}

export default function CharacterFilmsPieChart() {
  const { pieChartData } = usePaginatedCharacters();

  const handleExport = () => {
    exportPieChartToExcel(pieChartData);
  };

  return (
    <CardContainer>
      <CardHeader
        title="Films Distribution"
        actions={
          <Button
            variant="outlined"
            size="small"
            startIcon={<FileDownloadIcon />}
            onClick={handleExport}
            disabled={pieChartData.length === 0}
          >
            Export to Excel
          </Button>
        }
      />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Chart
          options={{
            chart: {
              height: '100%'
            }
          }}
          containerProps={{
            style: {
              height: '100%',
              width: '100%'
            }
          }}
        >
          <Tooltip
            useHTML
            formatter={function (this: IPiePointWithFilms) {
              const films = this.films ?? [];
              const name = this.name ?? '';
              const filmsList =
                films.length > 0
                  ? `<ul style="margin: 4px 0; padding-left: 16px;">${films.map((film: string) => `<li>${film}</li>`).join('')}</ul>`
                  : '<em>No films</em>';

              return `
                <strong>${name}</strong><br/>
                <b>Percentage:</b> ${this.percentage?.toFixed(1)}%<br/>
                <b>Films (${films.length}):</b>${filmsList}
              `;
            }}
          />
          <Series type="pie" data={pieChartData} options={{ name: 'Films' }} />
        </Chart>
      </Box>
    </CardContainer>
  );
}
