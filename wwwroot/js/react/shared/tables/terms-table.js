import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import { faClone, faTrashCan, faEdit, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

import { GetFromStorage, SetToStorage } from '../../extensions/local-storage';
import { Left, Right } from '../../shared/left-right';
import Paging from '../paging';
import NoItems from '../../shared/no-items';
import ProgressBadges from './../progress-badges';
import Loader from '../loader';
import SearchInput from '../search-input';
import Modal from '../modals/modal';
import ModalInfo from '../modals/modal-info';
import Lnk from '../buttons/lnk';
import { SetsClass } from './../table-buttons';
import Severity from '../../shared/severity';
import Alias from '../alias'; 

import { 
    Link_Folder_Term_Edit,
    Link_Folder_Term_Sets,
    Link_Set_Term_Sets,
    Link_Set_Term_Edit,
    Link_Set_Term_Clone,
    Api_Folder_Terms,
    Api_Set_Terms,
    Api_Term_Delete
} from './../../links';

export default function TermsTable(props) {

    const elementId = ( props.setId !== undefined ? 'set-' + props.setId : 'folder-' + props.folderId) + '-terms-';
    const orderId = elementId + 'order';
    const filterId = elementId + 'filter';
    const severityFilterId = elementId + 'severity-filter';
    const setsFilterId = elementId + 'sets-filter';
    const pageId = elementId + 'page';

    let [data, setData] = useState('');
    let [leaded, setLoaded] = useState(false);
    let [order, setOrder] = useState(GetFromStorage(orderId, ''));
    let [filter, setFilter] = useState(GetFromStorage(filterId, ''));
    let [severityFilter, setSeverityFilter] = useState(GetFromStorage(severityFilterId, ''));
    let [setsFilter, setSetsFilter] = useState(GetFromStorage(setsFilterId, ''));
    
    let [infoModalContent, setInfoModalContent] = useState('');
    let [deleteModalContent, setDeleteModalContent] = useState('');
    let [deleteModalTermId, setDeleteModalTermId] = useState(null);

    let isFirstRun = false;
    
    const getItems = () => {
        let isFirstParam = false;
        let href = props.setId !== undefined 
            ? Api_Set_Terms(props.setId)
            : Api_Folder_Terms(props.folderId);

        let page = GetFromStorage(pageId, '');
        if(page !== ''){
            href += (isFirstParam ? '&' : '?') + 'page=' + page;
            isFirstParam = true;
        }

        if(filter !== ''){
            href += (isFirstParam ? '&' : '?') + 'filter=' + filter;
            isFirstParam = true;
        }

        if(severityFilter !== ''){
            href += (isFirstParam ? '&' : '?') + 'severity=' + severityFilter;
            isFirstParam = true;
        }

        if(setsFilter !== ''){
            href += (isFirstParam ? '&' : '?') + 'sets=' + setsFilter;
            isFirstParam = true;
        }

        if(order !== ''){
            href += (isFirstParam ? '&' : '?') + 'order=' + order;
            isFirstParam = true;
        }

        setLoaded(false);
        axios.get(href)
        .then(function (response) {
            setData(response.data);
            setLoaded(true);
        })
    };

    const applyFilter = () => {
        SetToStorage(pageId, '');
    }

    const updateFilter = (value) => {
        applyFilter();
        setFilter(value);
        SetToStorage(filterId, value);
    }

    const updateSeverityFilter = (event) => {
        applyFilter();
        setSeverityFilter(event.target.value);
        SetToStorage(severityFilterId, event.target.value);
    }

    const updateSetsFilter = (event) => {
        applyFilter();
        setSetsFilter(event.target.value);
        SetToStorage(setsFilterId, event.target.value);
    }

    const updateOrder = (event) => {
        applyFilter();
        setOrder(event.target.value);
        SetToStorage(orderId, event.target.value);
    }

    useEffect(() => {
        getItems();
        isFirstRun = true;
    },[]);

    // filter
    useEffect(() => {
        if(isFirstRun === false){
            getItems();
        }
    }, [filter]);

    // severity filter
    useEffect(() => {
        if(isFirstRun === false){
            getItems();
        }
    }, [severityFilter]);

    // sets filter
    useEffect(() => {
        if(isFirstRun === false){
            getItems();
        }
    }, [setsFilter]);

    // order
    useEffect(() => {
        if(isFirstRun === false){
            getItems();
        }
    }, [order]);

    // Info Modal
    const infoModal = useRef();

    const openInfoModal = (content) => {
        setInfoModalContent(content);
        infoModal.current.open();
    }

    const infoModalComponent = <ModalInfo ref={infoModal} content={infoModalContent}/>

    // Delete Modal
    const deleteModal = useRef();

    const openDeleteModal = (term) => {
        let deletModalContent = <div>
                                    <p>Are you sure you want to delete this term?</p>
                                    <span dangerouslySetInnerHTML={{__html: term.left}}/>
                                </div>;

        setDeleteModalTermId(term.id);
        setDeleteModalContent(deletModalContent);
        
        deleteModal.current.open();
    }
    
    const deleteTerm = () => {
        setLoaded(false);
        axios.delete(Api_Term_Delete(deleteModalTermId))
        .then(function (response) {
            getItems();
            openInfoModal('The term has been deleted successfully');
        })
        .catch(function (error) {
            setLoaded(true);
            openInfoModal(error.response.data.message);
        });
    }

    const deleteModalComponent = <Modal ref={deleteModal} content={deleteModalContent} confirmAction={deleteTerm} confirmButtonText='Delete'/>

    let getSetsLink = (termId) => {
        return props.setId !== undefined 
            ? Link_Set_Term_Sets(props.setId, termId)
            : Link_Folder_Term_Sets(props.folderId, termId);
    }

    let getEditLink = (termId) => {
        return props.setId !== undefined 
            ? Link_Set_Term_Edit(props.setId, termId) 
            : Link_Folder_Term_Edit(props.folderId, termId);
    }

    const items = data ? data.items.length === 0 ? <NoItems/> : data.items.map((term, index) =>
        <div className='l-row' key={index}>
            <div className='l-clm prg-btns'>
                <ProgressBadges scs={term.success} flr={term.failure} prg={term.progress} />
                <Lnk text='Sets' isBtn={true} href={getSetsLink(term.id)} count={term.setsCount} className={SetsClass(term.setsCount)}/>
            </div>
            <div className='l-clm bdgs'>
                <Severity severity={term.severity}/>
                <Alias alias={term.alias}/>
            </div>
            <div className='l-clm actn'>
                <Lnk text='Edit' icon={faEdit} isBtn={true} href={getEditLink(term.id)}/>
                <Lnk text='Clone' icon={faClone} isBtn={true} href={Link_Set_Term_Clone(props.setId, term.id)}/>
                <Lnk text='Reset' icon={faArrowRotateRight} isBtn={true} className='l-red'/>
                <Lnk text='Delete' icon={faTrashCan} isBtn={true} onClick={() => openDeleteModal(term)} className='l-red'/>
            </div>
            <div className="l-clm trms">
                <Left content={term.left} title={term.setLeft} notes={term.leftNotes}/>
                <Right content={term.right} title={term.setRight} notes={term.rightNotes}/>
            </div>
        </div>) : <NoItems/>;

    let paging = <Paging getItems={getItems} data={data} elementId={pageId} />;

    let filters =   <div className='l-fltr'>
                        <div>
                            <SearchInput onUpdate={updateFilter} value={filter} />
                        </div>
                        <div>
                            <select onChange={(event)=>(updateSetsFilter(event))} defaultValue={setsFilter}>
                                <option value=''>Sets Count</option>
                                <option value={0}>Many sets</option>
                                <option value={1}>Single set</option>
                            </select>
                        </div>
                        <div>
                            <select onChange={(event)=>(updateSeverityFilter(event))} defaultValue={severityFilter}>
                                <option value=''>Severity</option>
                                <option value={1}>Easy</option>
                                <option value={0}>Medium</option>
                                <option value={2}>Hard</option>
                            </select>
                        </div>
                        <div>
                            <select onChange={(event)=>(updateOrder(event))} defaultValue={order}>
                                <option value=''>Alphabetically</option>
                                <option value="learned">Less Learned</option>
                                <option value="recent-first">Recent First</option>
                                <option value="recent-last">Recent Last</option>
                            </select>
                        </div>
                    </div>;

    let termsTable = leaded === false ? <Loader /> : 
            <div className='l-tbl-terms'>
                {deleteModalComponent}
                {paging}
                <div className='l-fltr-tbl'>
                    {filters}
                    <div className='l-tbl'>
                        {items}
                    </div>
                </div>
                {paging}
            </div>;

    return <div>
                {infoModalComponent}
                {termsTable}
            </div>
}