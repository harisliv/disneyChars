import { usePaginatedCharacters } from '@/hooks';
import { Chart, Series, Tooltip } from '@highcharts/react';
import type Highcharts from 'highcharts';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CardContainer, CardHeader } from '@/components/Card';
import { useExportPie } from '@/hooks';
import { FlexCenteredContainerWithPadding } from '../shared';

interface IPiePointWithFilms extends Highcharts.Point {
  films?: string[];
  percentage?: number;
}

export default function CharacterFilmsPieChart() {
  const { pieChartData, emptyResults } = usePaginatedCharacters();
  const exportToExcel = useExportPie();

  const handleExport = () => {
    exportToExcel();
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
            disabled={emptyResults}
          >
            Export to Excel
          </Button>
        }
      />
      <FlexCenteredContainerWithPadding>
        {emptyResults ? (
          <Chart>
            <Tooltip
              useHTML
              formatter={function () {
                return `
                <strong>No characters found</strong><br/>
              `;
              }}
            />
            <Series
              type="pie"
              data={pieChartData}
              options={{ name: 'Films' }}
            />
          </Chart>
        ) : (
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
            <Series
              type="pie"
              data={pieChartData}
              options={{ name: 'Films' }}
            />
          </Chart>
        )}
      </FlexCenteredContainerWithPadding>
    </CardContainer>
  );
}
