import React, { forwardRef } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import faqsAPI from "../../services/faqsAPI";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import TextField from '@material-ui/core/TextField';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function FaqMaterialTable(props) {
    const tableColumns = {
        columns: [
            {
                title: 'Catégorie', field: 'categoryID', lookup: { 1: 'Agents', 2: 'Voyageurs', 3: 'Autres' }, cellStyle: {
                    textAlign: 'center'
                },
                headerStyle: {
                    textAlign: 'center'
                }
            },
            {
                title: 'Question', field: 'question', cellStyle: {
                    verticalAlign: 'baseline'
                },
                headerStyle: {
                    textAlign: 'center'
                }, editComponent: props => (
                    <TextField
                        style={{ width: '100%' }}
                        multiline
                        value={props.value}
                        onChange={e => props.onChange(e.target.value)}
                    />
                )
            },
            {
                title: 'Réponse', field: 'answer',
                cellStyle: {
                    verticalAlign: 'baseline'
                },
                headerStyle: {
                    textAlign: 'center'
                },
                editComponent: props => (
                    <TextField
                        style={{ width: '100%' }}
                        multiline
                        value={props.value}
                        onChange={e => props.onChange(e.target.value)}
                    />
                )
            },
            {
                title: 'Question populaire ?', field: 'featured', className: "test", lookup: { true: 'Oui', false: 'Non' }, cellStyle: {
                    textAlign: 'center'
                },
                headerStyle: {
                    textAlign: 'center'
                }
            }
        ],
    }
    return (
        <>
            <MaterialTable
                localization={{
                    body: {
                        editRow: {
                            deleteText: 'Êtes-vous certain de vouloir supprimer cette question ?',
                            cancelTooltip: "Annuler",
                            saveTooltip: "Enregistrer"
                        },
                        deleteTooltip: "Supprimer",
                        editTooltip: "Éditer",
                        addTooltip: "Ajouter",
                        emptyDataSourceMessage: "Aucun résultat à afficher"
                    },
                    toolbar: {
                        searchPlaceholder: "Rechercher",
                        searchTooltip: "Rechercher"
                    },
                    pagination: {
                        labelRowsSelect: "lignes",
                        firstAriaLabel: "Première page",
                        firstTooltip: "Première page",
                        lastAriaLabel: "Dernière page",
                        lastTooltip: "Dernière page",
                        previousAriaLabel: "Page précédente",
                        previousTooltip: "Page précédente",
                        nextAriaLabel: "Page suivante",
                        nextTooltip: "Page suivante",
                        labelDisplayedRows: "{from}-{to} sur {count}"
                    }
                }}
                defaultSort={'asc'}
                style={{ width: '100%' }}
                icons={tableIcons}
                options={{ addRowPosition: 'first' }}
                title={props.title}
                columns={tableColumns.columns}
                data={props.faqList}
                editable={{
                    onRowAdd: async (faq) => {
                        try {
                            await faqsAPI.createFaq({ faq: faq });
                            props.setFaq({
                                categoryID: faq.categoryID,
                                question: faq.question,
                                answer: faq.answer,
                                featured: faq.featured
                            })
                            props.handleRefreshList()
                        } catch (error) {
                            throw error.response;
                        }
                    },
                    onRowUpdate: async (faq) => {
                        try {
                            await faqsAPI.updateFaq(faq.id, faq);
                            props.handleRefreshList()
                        } catch (error) {
                            console.log(error.response)
                        }
                    },
                    onRowDelete: async (faq) => {
                        try {
                            await faqsAPI.deleteFaq(faq.id);
                            props.handleRefreshList()
                        } catch (error) {
                            console.log(error.response)
                        }
                    }
                }}
            />
        </>
    );
}