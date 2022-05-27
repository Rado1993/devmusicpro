import React from 'react';
import { Paper } from '@material-ui/core';
import { Checkbox } from '@paljs/ui/Checkbox';
import { Column, Options } from 'material-table';
import { EvaIcon, Status } from '@paljs/ui';
import Moment from 'moment'
import moment from 'moment';

const localization = {
  body: {
    emptyDataSourceMessage: "No se han encontrado resultados",
    addTooltip: 'Agregar',
    deleteTooltip: 'Eliminar',
    editTooltip: 'Editar',
    filterRow: {
      filterTooltip: 'Filtrar'
    },
    editRow: {
      deleteText: 'Voulez-vous supprimer cette ligne?',
      cancelTooltip: 'Annuler',
      saveTooltip: 'Enregistrer'
    }
  },
  grouping: {
    placeholder: "Agrupar por ...",
    groupedBy: 'Agrupado por:'
  },
  header: {
    actions: ''
  },
  pagination: {
    labelDisplayedRows: '{from}-{to} de {count}',
    labelRowsSelect: 'filas',
    labelRowsPerPage: 'Filas por página:',
    firstAriaLabel: 'Primera página',
    firstTooltip: 'Primera página',
    previousAriaLabel: 'Página anterior',
    previousTooltip: 'Página anterior',
    nextAriaLabel: 'Página siguiente',
    nextTooltip: 'Página siguiente',
    lastAriaLabel: 'Ultima página',
    lastTooltip: 'Ultima página'
  },
  toolbar: {
    addRemoveColumns: 'Ajouter ou supprimer des colonnes',
    nRowsSelected: '{0} item(s) seleccionado(s)',
    showColumnsTitle: 'Voir les colonnes',
    showColumnsAriaLabel: 'Voir les colonnes',
    exportTitle: 'Exportar',
    exportAriaLabel: 'Exportar',
    exportCSVName: "Exportar CSV",
    exportPDFName: "Exportar PDF",
    searchTooltip: 'Filtrar',
    searchPlaceholder: 'Filtrar'
  }
}

const headerStyle = { backgroundColor: 'rgb(166 191 206 / 50%)', zIndex: 0 };

const components = {
  Container: (props: any) => <Paper {...props} elevation={0} />
}

const options: Options<any> = {
  search: true,
  draggable: false,
  paging: false,
  headerStyle,
  loadingType: 'overlay',
}
const colCheckbox = (title: string, field: string, callback: any, style?: Status): Column<any> => {
  return {
    title,
    field,
    headerStyle,
    width: "10%",
    align: 'center',
    render: (rowData: any) =>
      <Checkbox style={{ cursor: 'pointer' }}
        checked={rowData[field] ?? true}
        status={style == null ? ((rowData[field] ?? true) ? "Success" : "Danger") : style}
        onChange={() => callback(field, rowData)}
      />
  }
}
const colIconCheck = (title: string, field: string): Column<any> => {
  return {
    title,
    headerStyle,
    export: false,
    field: field,
    align: 'center',
    width: "10%",
    render: rowData =>
      <div style={{ display: 'inline-flex' }}>
        <EvaIcon status={(rowData[field] == true || rowData[field] == 'True' /*es forzoso*/ || rowData[field] == 1) ? 'Success' : 'Danger'} name={(rowData[field] == true || rowData[field] == 'True' /*es forzoso*/ || rowData[field] == 1) ? 'checkmark-square-2-outline' : 'close-square-outline'} />
      </div>
  }
}

const colDate = (title: string, field: string, field2: string, time?): Column<any> => { //BGU 
  return {
    title,
    headerStyle,
    export: false,
    align: 'center',
    width: "10%",
    render: rowData =>
      <div>
        <div style={{ width: '102%' }}>{(time) ? Moment(rowData[field]).format('DD-MM-YYYY HH:mm') : Moment(rowData[field]).format('DD-MM-YYYY')}/</div>
        <div>{(time) ? Moment(rowData[field2]).format('DD-MM-YYYY HH:mm') : Moment(rowData[field2]).format('DD-MM-YYYY')}</div>
      </div>
  }
}


const colStatedate = (title: string, datef: string): Column<any> => {

  const state = (date1: string) => {
    if (date1 != undefined) {
      var f1 = moment(date1.substring(0, 10));
      var f2 = moment(new Date().toISOString().slice(0, 10));

      if (f1.diff(f2, 'days') > 0) {
        return (<EvaIcon status={'Success'} name={'checkmark-circle-2'} />)
      } else if (f1.diff(f2, 'days') == 0) {
        return (<EvaIcon status={'Warning'} name={'alert-triangle'} />)
      } else {
        return (<EvaIcon status={'Danger'} name={'alert-circle'} />)
      }
    } else {
      return (<EvaIcon status={'Danger'} name={'alert-circle'} />)
    }

  }
  return {
    title,
    headerStyle,
    export: false,
    align: 'center',
    width: "10%",
    render: rowData =>
      <div style={{ display: 'inline-flex', paddingRight: '27%' }}>
        {state(rowData[datef])}
      </div>
  }
}



const colActions = (actions: any): Column<any> => {
  return {
    title: ' ',
    headerStyle,
    export: false,
    filtering: false,
    align: 'right',
    width: "20%",
    render: rowData =>
      <div style={{ display: 'inline-flex' }}>
        {actions.map((btn: any, k: number) => {
          return (
            <div key={k} onClick={() => { btn.action(rowData) }} className="action-btn">
              <EvaIcon status={btn.style} name={btn.icon} options={{ animation: { type: 'zoom' } }} />
            </div>
          )
        })}
      </div>
  }
}
const table = {
  localization,
  components,
  options,
  headerStyle,
  colCheckbox,
  colIconCheck,
  colActions,
  colDate,
  colStatedate,
};
export default table;