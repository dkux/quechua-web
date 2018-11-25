import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const MateriasChart = (props) => {


    let options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            animation: true,
            type: 'pie'
        },
        title: {
            text: 'Alumnos incriptos por materia'
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<b>{point.key}</b><table>',
            pointFormat: `<tr>
                            <td style="color: {series.color}">#Inscriptos: </td>
                            <td style="text-align: right"><b>{point.inscriptos}</b></td>
                      </tr>
                      <tr>
                            <td style="color: {series.color}">#Docentes: </td>
                            <td style="text-align: right"><b>{point.docentes}</b></td>
                      </tr>
                      <tr>
                            <td style="color: {series.color}">#Cursos: </td>
                            <td style="text-align: right"><b>{point.cursos}</b></td>
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
                events: {
                    click: function (event) {
                        let materiaId = event.point.id;
                        props.onClickMateria(materiaId);
                    }
                }
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
            oneToOne={true}
        />
    );
};

export default MateriasChart;
