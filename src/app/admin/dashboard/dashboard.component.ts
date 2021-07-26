import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
//import { donutChartOptions } from './graphics/donutChartOptions';
//import { areaChartOptions } from './graphics/areaChartOptions';
//import { barChartOptions } from './graphics/barChartOptions';
//import { polarChartOptions } from './graphics/polarChartOptions';
import { UsuariosService } from '../../services/usuarios.service';
import { PublicacionesService } from '../../services/publicaciones.service';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  admin: number = 0;
  comp: number = 0;
  empl: number = 0;
  dataPie: Array<any> = [];
  data0: any = {}
  data1: any = {}
  data2: any = {}
  array0: Array<any> = [];
  array1: Array<any> = [];
  array2: Array<any> = [];
  dataEmpl: Array<any> = [];
  dataComp: Array<any> = [];
  dataFP: Array<any> = [];
  dataFE: Array<any> = [];
  dataFV: Array<any> = [];

  constructor(private usuariosService: UsuariosService, private publicacionesService: PublicacionesService ) { }

  getBrightRandomColor(): string {
    var num=(Math.floor(Math.random()*4)*4).toString(16);
    var letters = ['0','F',num];
    var color = '#';

    for (var i = 0; i < 3; i++ ) {
        let valor = Math.floor(Math.random() * letters.length);
        color += letters[valor];
        letters.splice(valor, 1);
    }
    return color;
  }

  getRandomColor(): string {
    var letter = "0123456789ABCDEF";
    var color = "#";

    for (var i=0; i<6; i++)
        color += letter[Math.floor(Math.random()*16)];
    return color;
  }

  //Gráfica de pastel para la cantidad de usuarios disponibles en el sistema
  highchartsPie: typeof Highcharts = Highcharts;
  donutChart: Highcharts.Options = {
    chart: {
      type: 'pie',
      plotShadow: false,
    },
    credits: {
      enabled: false
    },
    subtitle : {
      //text: "Cantidad de usuarios en el sistema",
      style: {
        position: 'relative',
        left: '0px',
        top: '10px'
      }
    },
    plotOptions: {
      pie: {
        innerSize: '99%',
        borderWidth: 70,
        borderColor: '',
        slicedOffset: 40,
        dataLabels: {
          connectorWidth: 0
        }
      }
    },
    title: {
      verticalAlign: 'middle',
      floating: true,
      text: 'No. de Usuarios'
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: 'usuarios',
        type: 'pie',
        data: [this.data2, this.data1, this.data0
        ]
      },
    ]
  };

  highchartsArea: typeof Highcharts = Highcharts;
  //Gráfico de área para la cantidad de usuarios registrados por mes
  areaChart: Highcharts.Options = {
    chart: {
       type: 'area'
    },
    title: {
       text: 'Registro de usuarios en el sistema'
    },
    legend : {
       layout: 'vertical',
       align: 'left',
       verticalAlign: 'top',
       x: -150,
       y: 100,
       floating: true,
       borderWidth: 1,
    },
    xAxis:{
       categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis : {
       title: {
          text: 'No. de usuarios registrados'
       },
       allowDecimals: false
    },
    plotOptions : {
       area: {
          fillOpacity: 0.5,
       },
      series: {
        marker: {
          enabled: false,
        }
      }
    },
    credits:{
       enabled: false
    },
    series: [
       {
          name: 'Employees',
          type: 'area',
          color: this.getRandomColor(),
          data: this.dataEmpl
       },
       {
          name: 'Companies',
          type: 'area',
          color: this.getRandomColor(),
          data: this.dataComp
       }
    ]
 };

  highchartsBar: typeof Highcharts = Highcharts;
  //Gráfica de barra para la cantidad de publicaciones realizadas en el sistema
  barChart: Highcharts.Options = {
    chart: {
      type: 'bar',
    },
    credits: {
      enabled: false
    },
    title: {
      text: 'Publicaciones realizadas (por mes)'
    },
    xAxis: {
      lineColor: '#fff',
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
    },
    yAxis: {
      visible: true,
      title: {
        text: 'No. de publicaciones realizadas'
      },
      allowDecimals: false
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderRadius: 5,
      } as any
    },
    series: [
      {
        name: 'Publicaciones realizadas',
        type: 'bar',
        color: this.getRandomColor(),
        data: this.dataFP
      }
    ]
  };

  highchartsColumn: typeof Highcharts = Highcharts;
  //Gráfica de columna para la cantidad de publicaciones eliminadas y vencidad en el sistema
  columnChart: Highcharts.Options = {
    chart: {
       type: 'column'
    },
    title: {
       text: 'Publicaciones eliminadas y vencidas (por mes)'
    },
    credits: {
      enabled: false
    },
    xAxis:{
       categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul', 'Aug','Sep','Oct','Nov','Dec'],
       crosshair: true
    },
    yAxis : {
       min: 0,
       title: {
          text: 'No. de publicaciones'
       },
       allowDecimals: false
    },
    plotOptions : {
       column: {
          pointPadding: 0.1,
          borderWidth: 0
       },
       series: {
        borderRadius: 5,
        innerWidth: '50%'
      } as any
    },

    series: [
      {
        name: 'Eliminadas',
        color: this.getRandomColor(),
        type: 'column',
        data: this.dataFE
      },
      {
        name: 'Vencidas',
        color: this.getRandomColor(),
        type: 'column',
        data: this.dataFV
      },
    ]
  };

  ngOnInit() {
    //Cantidad de Admins, Companies y Empleados en el Sistema, los 3 para la gráfica de pastel
    this.usuariosService.getAdmins()
      .subscribe((res) => {
        this.admin = res.length;
        this.data2['name'] = 'Admins';
        this.data2['y'] = this.admin;
        this.data2['color'] = this.getRandomColor();
        Highcharts.chart("pie", this.donutChart);
      }, error =>{console.log(error)}
    );
    this.usuariosService.getCompanies()
      .subscribe((res) => {
        this.comp = res.length;
        this.data1['name'] = 'Companies';
        this.data1['y'] = this.comp;
        this.data1['color'] = this.getRandomColor();
        Highcharts.chart("pie", this.donutChart);
      }, error =>{console.log(error)}
    );
    this.usuariosService.getEmployees()
      .subscribe((res) => {
        this.empl = res.length;
        this.data0['name'] = 'Employees';
        this.data0['y'] = this.empl;
        this.data0['color'] = this.getRandomColor();
        Highcharts.chart("pie", this.donutChart);
      }, error =>{console.log(error)}
    );

    //Cantidad de empleados registrados por cada mes para gráfica de área
    this.usuariosService.getEmployees()
      .subscribe((res: any) => {
        const empl = res;
        this.array0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i in this.array0) {
          for (let j in empl) {
            if (empl[j].fechaRegistro) {
              let mes = new Date(empl[j].fechaRegistro);
              let mesActual = mes.getMonth();

              if (mesActual == Number(i)) {
                this.array0[i] += 1;
              }
            }
          }
        }
        for (let i in this.array0) {
          this.dataComp.push(this.array0[i]);
        }

        Highcharts.chart("area", this.areaChart);
      }
    );

    //Cantidad de compañías registrados por cada mes para gráfica de área
    this.usuariosService.getCompanies()
      .subscribe((res: any) => {
        const comp = res;
        this.array1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i in this.array1) {
          for (let j in comp) {
            if (comp[j].fechaRegistro) {
              let mes = new Date(comp[j].fechaRegistro);
              let mesActual = mes.getMonth();

              if (mesActual == Number(i)) {
                this.array1[i] += 1;
              }
            }
          }
        }
        for (let i in this.array1) {
          this.dataEmpl.push(this.array1[i]);
        }

        Highcharts.chart("area", this.areaChart);
      }
    );

    //Cantidad de publicaciones realizadas, eliminadas y vencidas en el sistema por cada mes: fpev reutiliza array0, array1 y array2
    this.publicacionesService.getPosts()
      .subscribe((res: any) => {
        const fpev = res;
        this.array2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.array0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.array1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i in this.array2) {
          for (let j in fpev) {
            let fechaP = new Date(fpev[j].fechaPublicacion);
            let fechaV = new Date(fpev[j].fechaVencimiento);
            let mesActualP = fechaP.getMonth();
            let mesActualV = fechaV.getMonth();
            if (fpev[j].fechaPublicacion) {
              if (mesActualP == Number(i)) {
                this.array2[i] += 1;
              }
            }
            if (fpev[j].fechaVencimiento) {
              if ((mesActualV == Number(i)) && (fechaV.getTime() < Date.now())) {
                this.array1[i] += 1;
              }
            }
            if (fpev[j].estado == "eliminado" && (mesActualP == Number(i))) {
              this.array0[i] += 1;
            }
          }
        }
        for (let k in this.array2) {
          this.dataFP.push(this.array2[k]);
          this.dataFE.push(this.array0[k]);
          this.dataFV.push(this.array1[k]);
        }

        Highcharts.chart("bar", this.barChart);
        Highcharts.chart("column", this.columnChart);
      }
    );
}
}
