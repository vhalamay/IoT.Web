import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { GetFromStorage, SetToStorage } from '../../extensions/local-storage';
import Paging from '../../shared/paging';
import NoItems from '../../shared/no-items';
import Loader from '../../shared/loader';
import ProgressOrder from '../progress-order';
import Lnk from '../buttons/lnk';

import {
    Link_Session_Result,
    Link_Session_Question,
    Api_Sessions,
    Api_Session_Delete
} from '../../links';

export default function SessionsTable(props) {
    const elementId = 'sessions-';
    const pageId = elementId + 'page';

    let [dataTable, setDataTable] = useState('');
    let [loaded, setLoaded] = useState(false);
    
    const getItems = () => {
        setLoaded(false);

        let isFirstParam = false;
        let href = Api_Sessions();
        
        let page = GetFromStorage(pageId, '');
        if(page !== ''){
            href += (isFirstParam ? '&' : '?') + 'page=' + page;
            isFirstParam = true;
        }

        axios.get(href)
        .then(function (response) {
            setDataTable(response.data);
            setLoaded(true);
        })
    };

    useEffect(() => {
        getItems();
    },[]);
               
    function getSessionItemLink(session) {
        return session.answered === session.questions 
        ? Link_Session_Result(session.id) 
        : Link_Session_Question(session.id);
    }

    const deleteSession = (id) => {
        setLoaded(false);

        axios
        .delete(Api_Session_Delete(id))
        .then(function (response) {
            if(response.status === 200) {
                getItems();
            }
        })
    }
    const items = dataTable ? dataTable.items.length === 0 ? <NoItems/> : dataTable.items.map((session, index) => 
        <div className='l-row' key={index}>
            <div className='l-clm info'>
                <Lnk href={getSessionItemLink(session)} text={session.name}/>
            </div>
            <div className='l-clm prg'>
                <ProgressOrder scs={session.correct} qty={session.questions} crt={session.answered} />
            </div>
            <div className='l-clm actn'>
                <Lnk text='Delete' icon={faTrashCan} isBtn={true} onClick={() => (deleteSession(session.id))} className='l-red'/>
            </div>
        </div>)
        : <NoItems/>;

    let paging = <Paging data={dataTable} getItems={getItems} elementId={pageId} />;

    return loaded === false ? <Loader /> : 
            <div className='l-tbl-sessions'>
                {paging}
                <div className='l-tbl'>
                    {items}
                </div>
                {paging}
            </div>;
}