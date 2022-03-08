import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { PartidoService } from '../../services/PartidoService';
import { Container, DialogPartido } from './styles';

export const Partido = () => {

    const emptyPartido = {
        id: 0,
        nome: '',
        sigla: ''
    };

    interface IPartido {
        id: number,
        nome: string,
        sigla: string
    }

    const [partido, setPartido] = useState(emptyPartido);
    const [partidos, setPartidos] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [partidoDialog, setPartidoDialog] = useState(false);
    const [deletePartidoDialog, setDeletePartidoDialog] = useState(false);
    const [deletePartidosDialog, setDeletePartidosDialog] = useState(false);
    const [selectedPartidos, setSelectedPartidos] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [idPartido, setIdPartido] = useState(1013);
    const toast = useRef<any>(null);
    const dt = useRef(null);

    useEffect(() => {
        const partidoService = new PartidoService();
        partidoService.getPartidos().then(data => {
            setPartidos(data);
        });
    }, []);

    const openNew = () => {
        setPartido(emptyPartido);
        setSubmitted(false);
        setPartidoDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setPartidoDialog(false);
    }

    const hideDeletePartidoDialog = () => {
        setDeletePartidoDialog(false);
    }

    const hideDeletePartidosDialog = () => {
        setDeletePartidosDialog(false);
    }


    const savePartido = () => {
        setSubmitted(true);

        if (partido.nome.trim()) {
            let _partidos : any[] = [...partidos];
            let _partido = { ...partido };
            if (partido.id) {
               const index = findIndexById(partido.id);

                _partidos[index] = _partido;
                toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Partido atualizado com sucesso', life: 3000 });
            }
            else {
                _partido.id = createId();
                _partidos.push(_partido);
                toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Partido inserido com sucesso', life: 3000 });
            }

            //setPartidos(_partidos);
            setPartidoDialog(false);
            setPartido(emptyPartido);
        }
    }

    const editarPartido = (partido) => {
        setPartido({ ...partido });
        setPartidoDialog(true);
    }

    const confirmDeletePartido = (partido) => {
        setPartido(partido);
        setDeletePartidoDialog(true);
    }

    const deletePartido = () => {
        let _partidos = partidos.filter(val => {
            let teste:any = val;
            return teste.id !== partido.id;
        });
        setPartidos(_partidos);
        setDeletePartidoDialog(false);
        setPartido(emptyPartido);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Partido excluido com sucesso', life: 3000 });
    }

    const findIndexById = (id:number) => {
        let index = -1;
        for (let i = 0; i < partidos.length; i++) {
            /*if (partidos[i].id === id) {
                index = i;
                break;
            }*/
        }

        return index;
    }

    const createId = () => {
        let _idPartido = idPartido;
        _idPartido++;
        setIdPartido(_idPartido);
        return idPartido;
    }

    const confirmDeleteSelected = () => {
        setDeletePartidosDialog(true);
    }

    const deleteSelectedPartidos = () => {
        //let _partidos = partidos.filter(val => !selectedPartidos.includes(val));
        //setPartidos(_partidos);
        setDeletePartidosDialog(false);
        setSelectedPartidos(null);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Partidos excluidos com sucesso', life: 3000 });
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _partido = { ...partido };
        _partido[`${name}`] = val;

        setPartido(_partido);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Excluir" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedPartidos /*|| !selectedPartidos.length*/} />
                </div>
            </React.Fragment>
        )
    }

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">ID</span>
                {rowData.id}
            </>
        );
    }

    const nomeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nome</span>
                {rowData.nome}
            </>
        );
    }

    const siglaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Sigla</span>
                {rowData.sigla}
            </>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editarPartido(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeletePartido(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Partidos</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" /*onInput={(e) => setGlobalFilter(e.target.value)}*/ placeholder="Filtrar..." />
            </span>
        </div>
    );

    const partidoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Gravar" icon="pi pi-check" className="p-button-text" onClick={savePartido} />
        </>
    );
    const deletePartidoDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeletePartidoDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deletePartido} />
        </>
    );
    const deletePartidosDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeletePartidosDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedPartidos} />
        </>
    );

    return (
        <Container className="grid crud-demo">
            <div className="col-12">
               <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>

                    <DataTable ref={dt} value={partidos} selection={selectedPartidos} onSelectionChange={(e) => setSelectedPartidos(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} partidos"
                        globalFilter={globalFilter} emptyMessage="Nenhum partido encontrado." header={header}>
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="id" header="Id" sortable body={idBodyTemplate}></Column>
                        <Column field="nome" header="Nome" sortable body={nomeBodyTemplate}></Column>
                        <Column field="sigla" header="Sigla" sortable body={siglaBodyTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <DialogPartido visible={partidoDialog} header="Partido" modal className="p-fluid" footer={partidoDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="nome">Nome</label>
                            <InputText id="nome" value={partido.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !partido.nome })} />
                            {submitted && !partido.nome && <small className="p-invalid">Nome é obrigatório.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="sigla">Sigla</label>
                            <InputText id="sigla" value={partido.sigla} onChange={(e) => onInputChange(e, 'sigla')} required autoFocus className={classNames({ 'p-invalid': submitted && !partido.sigla })} />
                            {submitted && !partido.sigla && <small className="p-invalid">Sigla é obrigatório.</small>}
                        </div>
                    </DialogPartido>

                    <Dialog visible={deletePartidoDialog} style={{ width: '450px' }} header="Confirma" modal footer={deletePartidoDialogFooter} onHide={hideDeletePartidoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {partido && <span>Tem certeza que deseja excluir o partido <b>{partido.nome}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deletePartidosDialog} style={{ width: '450px' }} header="Confirma" modal footer={deletePartidosDialogFooter} onHide={hideDeletePartidosDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {partido && <span>Tem certeza que deseja excluir os partidos selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </Container>
    );
}
