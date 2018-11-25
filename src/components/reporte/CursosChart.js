import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const CursosChart = (props) => {


    let options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Alumnos incriptos por curso'
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<b>{point.key}</b><table>',
            pointFormat: `<tr>
                            <td style="color: {series.color}">Profesor: </td>
                            <td style="text-align: right"><b>{point.profesor}</b></td>
                      </tr>
                      <tr>
                            <td style="color: {series.color}">#Inscriptos: </td>
                            <td style="text-align: right"><b>{point.inscriptos}</b></td>
                      </tr>`,
            footerFormat: '</table>',
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            },
            series: {
                cursor: 'pointer',
            }
        },
        series: [{
            colorByPoint: true,
            data: props.chartData
        }]
    };

    return(
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
};

export default CursosChart;
