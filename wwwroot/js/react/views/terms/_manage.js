import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Term from '../../models/term';
import Loader from './../../shared/loader';
import ProgressBadges from '../../shared/progress-badges';
import Modal from '../../shared/modals/modal';
import TopButtons from '../../shared/top-buttons';
import TopButton from '../../models/top-button';

import { 
    Link_Folder_Terms,
    Link_Set_Terms,
    Api_Term_Edit,
    Api_Term_Reset,
    Api_Set_Terms_Create
 } from './../../links';

export default function TermManage(props) {
    let navigate = useNavigate();

    let [term, setTerm] = useState(new Term());
    let [termId, setTermId] = useState(props.termId);
    let [clone, setClone] = useState(props.clone !== undefined ? props.clone : false);
    let [success, setSuccess] = useState(0);
    let [failure, setFailure] = useState(0);
    let [progress, setProgress] = useState(0);

    let [termLoaded, setTermLoaded] = useState(true);

    const getTerm = () => {
        if(props.termId !== undefined) {
            setTermLoaded(false);

            axios
            .get(Api_Term_Edit(props.termId))
            .then(function (response) {
                setTerm(new Term(response.data));
                setSuccess(response.data.success);
                setFailure(response.data.failure);
                setProgress(response.data.progress);

                setTermLoaded(true);
            })
        }
    };

    useEffect(() => {
        getTerm();
    },[]);  

    const updateLeft = (event) => {
        const t = {...term};
        t.left = event.target.value;
        setTerm(t);
    }

    const updateRight = (event) => {
        const t = {...term};
        t.right = event.target.value;
        setTerm(t);
    }

    const updateLeftNotes = (event) => {
        const t = {...term};
        t.leftNotes = event.target.value;
        setTerm(t);
    }

    const updateRightNotes = (event) => {
        const t = {...term};
        t.rightNotes = event.target.value;
        setTerm(t);
    }

    const updateSeverity = (event) => {
        const t = {...term};
        t.severity = Number(event.target.value);
        setTerm(t);
    }

    const createTerm = () => {
        axios
        .post(Api_Set_Terms_Create(props.setId), term)
        .then(function (response) {
            navigate(Link_Set_Terms(props.setId));
        });
    }

    const updateTerm = () => {
        axios
        .put(Api_Term_Edit(termId), term)
        .then(function (response) { 
            let href = props.setId !== undefined 
            ? Link_Set_Terms(props.setId)
            : Link_Folder_Terms(props.folderId);

            navigate(href);
        });
    }

    let edit = props.termId !== undefined && props.clone !== true;

    const resetModal = useRef();

    const openResetModal = () => {
        if((success !== undefined && success !== 0)
            || (failure !== undefined && failure !== 0)
            || (progress !== undefined && progress !== 0)){

            resetModal.current.open();
        }
    }

    const resetProgress = () => {
        axios
        .post(Api_Term_Reset(props.termId))
        .then(function (response) {
            setSuccess(0);
            setFailure(0);
            setProgress(0);

            resetModal.current.close();
        });
    }

    let modalContent = 'Are you sure you want to reset the progress of this term?';

    let reset = <div>
                    <Modal ref={resetModal} content={modalContent} confirmAction={resetProgress}/>
                    <ProgressBadges scs={success} flr={failure} prg={progress} />
                </div>

    let isUpdate = edit;
    let isClone = termId !== undefined && clone === true;
    let isCreate = termId === undefined;

    let buttons = [];
    if(isUpdate) {
        buttons.push(new TopButton('Reset', null, openResetModal, 'l-red'));
        buttons.push(new TopButton('Update', null, updateTerm));
    } else if(isClone) {
        buttons.push(new TopButton('Clone', null, createTerm));
    } else if (isCreate) {
        buttons.push(new TopButton('Create', null, createTerm));
    }

    let content = <div>
                {edit && reset}
                <TopButtons buttons={buttons}/>
                <div>
                    <div className='inpts'>
                        <div>
                            <label>Severity</label>
                            <select onChange={(event) => (updateSeverity(event))} value={term.severity}>
                                <option value={1}>Easy</option>
                                <option value={0}>Medium</option>
                                <option value={2}>Hard</option>
                            </select>
                        </div>
                    </div>
                    <div className='inpts inpts-2'>
                        <div>
                            <label>Left</label>
                            <textarea onChange={(event)=>(updateLeft(event))} value={term.left}></textarea>
                        </div>
                        <div>
                            <label>Right</label>
                            <textarea onChange={(event)=>(updateRight(event))} value={term.right}></textarea>
                        </div>
                    </div>
                    <div className='inpts inpts-2'>
                        <div>
                            <label>Left Notes</label>
                            <textarea onChange={(event)=>(updateLeftNotes(event))} value={term.leftNotes}></textarea>
                        </div>
                        <div>
                            <label>Right Notes</label>
                            <textarea onChange={(event)=>(updateRightNotes(event))} value={term.rightNotes}></textarea>
                        </div>
                    </div>
                </div>
            </div>;

    return termLoaded === false
        ? <Loader/> 
        : content;
}