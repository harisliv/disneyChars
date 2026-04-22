import { useCharactersPieData } from '@/hooks';
import { Chart, Series, Tooltip } from '@highcharts/react';
import type Highcharts from 'highcharts';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CardContainer, CardHeader } from '@/components/Card';
import { useExportPie } from '@/hooks';
import { FlexCenteredContainerWithPadding } from '../shared';
import type { TDisneyCharacter } from '@/types';

interface IPiePointWithFilms extends Highcharts.Point {
  films?: string[];
  percentage?: number;
}

interface ICharacterFilmsPieChartProps {
  characters: TDisneyCharacter[];
}

export default function CharacterFilmsPieChart({
  characters
}: ICharacterFilmsPieChartProps) {
  const pieChartData = useCharactersPieData(characters);
  const exportToExcel = useExportPie(pieChartData);

  return (
    <CardContainer>
      <CardHeader title="Films Distribution">
        <Button
          variant="outlined"
          size="small"
          startIcon={<FileDownloadIcon />}
          onClick={exportToExcel}
          disabled={characters.length === 0}
        >
          Export to Excel
        </Button>
      </CardHeader>

      <FlexCenteredContainerWithPadding>
        {characters.length === 0 ? (
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
