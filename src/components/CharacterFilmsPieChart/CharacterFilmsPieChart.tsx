import { usePaginatedTableData } from '@/hooks/usePaginatedTableData';
import { Chart, Series, Tooltip } from '@highcharts/react';
import type Highcharts from 'highcharts';
import Box from '@mui/material/Box';
import { CardContainer, CardHeader } from '@/components/Card';

interface IPiePointWithFilms extends Highcharts.Point {
  films?: string[];
  percentage?: number;
}

export default function CharacterFilmsPieChart() {
  const { pieChartData } = usePaginatedTableData();
  return (
    <CardContainer>
      <CardHeader title="Films Distribution" />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Chart>
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
