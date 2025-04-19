import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import { faClone, faTrashCan, faEdit, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

import { Left, Right } from '../../shared/left-right'
import Paging from '../paging';
import NoItems from '../../shared/no-items'
import { GetFromStorage, SetToStorage } from '../../extensions/local-storage';
import ProgressBadges from './../progress-badges';
import Loader from '../../shared/loader';
import SearchInput from '../search-input';
import Lnk from '../buttons/lnk';
import Modal from '../modals/modal';
import ModalInfo from '../modals/modal-info';
import Severity from '../../shared/severity';
import Alias from '../../shared/alias';

import {
    Link_Folder_Test_Edit,
    Link_Set_Test_Edit,
    Link_Set_Test_Clone,
    Api_Folder_Tests,
    Api_Set_Tests,
    Api_Test_Delete
} from '../../links';

export default function TestsTable(props) {
    const elementId = ( props.setId !== undefined ? 'set-' + props.setId : 'folder-' + props.folderId) + '-tests-';
    const orderId = elementId + 'order';
    const filterId = elementId + 'filter';
    const pageId = elementId + 'page';

    let [data, setData] = useState('');
    let [leaded, setLoaded] = useState(false);
    let [order, setOrder] = useState(GetFromStorage(orderId, ''));
    let [filter, setFilter] = useState(GetFromStorage(filterId, ''));
    let isFirstRun = false;

    let [infoModalContent, setInfoModalContent] = useState('');
    let [deleteModalContent, setDeleteModalContent] = useState('');
    let [deleteModalTestId, setDeleteModalTestId] = useState(null);

    const getItems = () => {
        let isFirstParam = false;
        let href = props.setId !== undefined 
            ? Api_Set_Tests(props.setId) 
            : Api_Folder_Tests(props.folderId);

        if(filter !== ''){
            href += (isFirstParam ? '&' : '?') + 'filter=' + filter;
            isFirstParam = true;
        }

        if(order !== ''){
            href += (isFirstParam ? '&' : '?') + 'order=' + order;
            isFirstParam = true;
        }

        let page = GetFromStorage(pageId, '');
        if(page !== ''){
            href += (isFirstParam ? '&' : '?') + 'page=' + page;
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

    // order
    useEffect(() => {
        if(isFirstRun === false){
            getItems();
        }
    }, [order]);

    // Delete Modal
    const deleteModal = useRef();

    const openDeleteModal = (test) => {
        let deletModalContent = <div>
                                    <p>Are you sure you want to delete this test?</p>
                                    <span dangerouslySetInnerHTML={{__html: test.left}}/>
                                </div>;

        setDeleteModalTestId(test.id);
        setDeleteModalContent(deletModalContent);
        
        deleteModal.current.open();
    }

    const deleteTest = () => {
        setLoaded(false);
        axios.delete(Api_Test_Delete(deleteModalTestId))
        .then(function (response) {
            getItems();
            openInfoModal('The test has been deleted successfully');
        })
        .catch(function (error) {
            setLoaded(true);
            openInfoModal(error.response.data.message);
        });
    }

    const deleteModalComponent = <Modal ref={deleteModal} content={deleteModalContent} confirmAction={deleteTest} confirmButtonText='Delete'/>

    // Info Modal
    const infoModal = useRef();

    const openInfoModal = (content) => {
        setInfoModalContent(content);
        infoModal.current.open();
    }

    const infoModalComponent = <ModalInfo ref={infoModal} content={infoModalContent}/>

    let getEditLink = (testId) => {
        return props.setId !== undefined 
            ? Link_Set_Test_Edit(props.setId, testId) 
            : Link_Folder_Test_Edit(props.folderId, testId);
    }

    const items = data ? data.items.length === 0 ? <NoItems/> : data.items.map((test, index) =>
        <div className='l-row' key={index}>
            <div className='l-clm prg-btns'>
                <ProgressBadges scs={test.success} flr={test.failure} prg={test.progress} />
                <Severity severity={test.severity}/>
                <Alias alias={test.alias}/>
            </div>
            <div className='l-clm actn'>
                <Lnk text='Edit' icon={faEdit} isBtn={true} href={getEditLink(test.id)}/>
                <Lnk text='Clone' icon={faClone} isBtn={true} href={Link_Set_Test_Clone(props.setId, test.id)}/>
                <Lnk text='Reset' icon={faArrowRotateRight} isBtn={true} className='l-red'/>
                <Lnk text='Delete' icon={faTrashCan} isBtn={true} onClick={() => openDeleteModal(test)} className='l-red'/>
            </div>
            <div className="l-clm tsts">
                <Left content={test.left} title={data.left} notes={test.notes}/>
                <TestCases testCases={test.cases} right={data.right}/>
            </div>
        </div>) : <NoItems/>;
        
    let paging = <Paging getItems={getItems} data={data} elementId={pageId} />;

    let filters =   <div className='l-fltr'>
                        <div>
                            <SearchInput onUpdate={updateFilter} value={filter}/>
                        </div>
                        <div>
                            <select onChange={(event)=>(updateOrder(event))} defaultValue={order}>
                                <option value=''>Alphabetically</option>
                                <option value="learned">Less Learned</option>
                                <option value="recent">Recent First</option>
                            </select>
                        </div>
                    </div>;

    let testsTable = leaded === false ? <Loader /> : 
    <div className='l-tbl-tests'>
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
        {testsTable}
    </div>
}

class TestCases extends React.Component {
    render() {
        const items = this.props.testCases.map((testCase) =>
                <Right key={testCase.id} content={testCase.right} title={this.props.right} correct={testCase.correct} notes={testCase.notes}/>
            );

        return  <div className='itm-cses'>
                    {items}
                </div>;
    }
}