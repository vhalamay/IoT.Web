import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import TestCase from '../../models/test-case';
import ProgressBadges from '../../shared/progress-badges';
import TopButtons from '../../shared/top-buttons';
import TopButton from '../../models/top-button';
import Modal from '../../shared/modals/modal';

import { 
    Link_Folder_Tests,
    Link_Set_Tests,
    Api_Test_Edit,
    Api_Test_Reset,
    Api_Set_Tests_Create
} from './../../links';

export default function TestManage(props) {
    let navigate = useNavigate();

    let [data, setData] = useState('');
    let [success, setSuccess] = useState(0);
    let [failure, setFailure] = useState(0);
    let [progress, setProgress] = useState(0);
    let [severity, setSeverity] = useState(0);

    const getData = () => {
        let testCases = [];

        if(props.testId === undefined){
            testCases.push(new TestCase(null, "Left", null, null, null, null)); 
            testCases.push(new TestCase(null, "Right", null, null, true, true));
            testCases.push(new TestCase(null, "Right", null, null, true, false));
            setData(testCases);
        } else {
            axios
            .get(Api_Test_Edit(props.testId))
            .then(function (response) {
                testCases.push(new TestCase(response.data.id, "Left", response.data.left, response.data.notes, null, null)); 
                response.data.cases
                .map((testCase) => {
                    testCases.push(new TestCase(testCase.id, "Right", testCase.right, testCase.notes, true, testCase.correct)) 
                });

                setData(testCases);
                setSuccess(response.data.success);
                setFailure(response.data.failure);
                setProgress(response.data.progress);
                setSeverity(response.data.severity);
            })
        }

    };

    useEffect(() => {
        getData();
    },[]);

    const resetModal = useRef();

    const openResetModal = () => {
        if((success !== undefined && success !== 0)
            || (failure !== undefined && failure !== 0)
            || (progress !== undefined && progress !== 0)){

            resetModal.current.open();
        }
    }

    const resetProgress = () => {
        if((success !== undefined && success !== 0)
            || (failure !== undefined && failure !== 0)
            || (progress !== undefined && progress !== 0)){
            axios
            .post(Api_Test_Reset(props.testId))
            .then(function (response) {
                setSuccess(0);
                setFailure(0);
                setProgress(0);

                resetModal.current.close();
            })
        }
    }

    const submitTest = () => {
        let testCases = [...data];

        let postData = {
            severity: severity,
            left: testCases[0].content,
            notes: testCases[0].notes,
            cases: []
        }

        postData.cases = testCases
        .slice(1)
        .map((testCase) => ({
            correct: testCase.isCorrect,
            right: testCase.content,
            notes: testCase.notes,
            id: testCase.id
        }));

        if(props.testId === undefined || props.clone === true) {
            axios
            .post(Api_Set_Tests_Create(props.setId), postData)
            .then(function (response) {
                navigate(Link_Set_Tests(props.setId));
            })
        }
        else {
            axios
            .put(Api_Test_Edit(props.testId), postData)
            .then(function (response) {
                let href = props.setId !== undefined 
                    ? Link_Set_Tests(props.setId)
                    : Link_Folder_Tests(props.folderId);

                navigate(href);
            })
        }
    }

    const addTestCase = () => {
        const testCase = new TestCase(null, "Right", "", "", true, false);
        setData([...data, testCase])
    }

    const removeTestCase = (index) => {
        const testCases = [...data];
        testCases.splice(index, 1);
        setData(testCases);
    }

    const updateContent = (event, index) => {
        const testCases = [...data];
        testCases[index].content = event.target.value;
        setData(testCases);
    }

    const updateNotes = (event, index) => {
        const testCases = [...data];
        testCases[index].notes = event.target.value;
        setData(testCases);
    }

    const updateIsCorrect = (index) => {
        const testCases = [...data];
        testCases[index].isCorrect = !testCases[index].isCorrect;
        setData(testCases);
    }

    const updateSeverity = (event) => {
        setSeverity(Number(event.target.value));
    }

    function TestCaseButtons(props) {
        let buttons = [];
        if(props.testCase.isCorrect === true) {
            buttons.push(new TopButton('Make incorrect', null, () => updateIsCorrect(props.index), 'l-red'));
        } 
        else if(props.testCase.isCorrect === false) {
            buttons.push(new TopButton('Make correct', null, () => updateIsCorrect(props.index), 'l-green'));
        }
        buttons.push(new TopButton('Remove', null, () => removeTestCase(props.index), 'l-red'));

        return props.testCase.isCorrect !== null && props.testCase.hasDelete !== null ? <TopButtons buttons={buttons}/> : null;
    }
    
    const items = data ? data.map((testCase, index) => 
        <div className='l-row' key={index}>
            <TestCaseButtons testCase={testCase} index={index}/>
            <div className='inpts inpts-2'>
                <div>
                    <label>{testCase.name}</label>
                    <textarea onChange={(event)=>(updateContent(event, index))} value={testCase.content}></textarea>
                </div>
                <div>
                    <label>Notes</label>
                    <textarea onChange={(event)=>(updateNotes(event, index))} value={testCase.notes}></textarea>
                </div>
            </div>
        </div>) : <div>No Data</div>;

    let submitButton = props.testId === undefined ? 'Create Test' 
        : props.clone === true ? 'Clone Test' : 'Update Test';

    let edit = props.testId !== undefined && props.clone !== true;
        
    let buttons = [new TopButton('Reset', null, openResetModal, 'l-red'),
        new TopButton('Add Case', null, addTestCase, 'l-green'),
        new TopButton(submitButton, null, submitTest)
    ];

    let modalContent = 'Are you sure you want to reset the progress of this test?';

    let reset = <div>
                    <Modal ref={resetModal} content={modalContent} confirmAction={resetProgress}/>
                    <ProgressBadges scs={success} flr={failure} prg={progress} />
                </div>

    let severityComponent = <div className='inpts'>
                                <div>
                                    <label>Severity</label>
                                    <select onChange={(event) => (updateSeverity(event))} value={severity}>
                                        <option value={1}>Easy</option>
                                        <option value={0}>Medium</option>
                                        <option value={2}>Hard</option>
                                    </select>
                                </div>
                            </div>

    return <div>
                {edit && reset}
                {severityComponent}
                <TopButtons buttons={buttons}/>
                <div className='l-tbl l-tbl-term'>
                    {items}
                </div>
            </div>;
}


