import React from 'react';
import { Paper } from '@material-ui/core';
import { Column, Options } from 'material-table';
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

const colDate = (title: string, field: string, field2: string, time?: any): Column<any> => { //BGU 
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
const table = {
  localization,
  components,
  options,
  headerStyle,
  colDate,
};
export default table;