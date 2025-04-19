import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Learn from '../../models/learn';
import Loader from '../../shared/loader';
import TopButtons from '../../shared/top-buttons';
import TopButton from '../../models/top-button';

import { 
    Api_Folder_Learn,
    Api_Folder_LearnCheck,
    Api_Set_Learn, 
    Api_Set_LearnCheck,
    Link_Session_Question
} from '../../links';

export default function LearnForm(props) {
    let navigate = useNavigate();

    let [learn, setLearn] = useState(new Learn());
    let [questions, setQuestions] = useState("Calculating...");
    let [leaded, setLoaded] = useState(false);

    let learnCheckUrl = props.folderId !== undefined 
        ? Api_Folder_LearnCheck(props.folderId) 
        : Api_Set_LearnCheck(props.setId);

    let learnUrl = props.folderId !== undefined 
        ? Api_Folder_Learn(props.folderId) 
        : Api_Set_Learn(props.setId);

    const all = 'All';

    useEffect(() => {
        learnCheck();
    }, [learn]);

    const learnCheck = () => {
        setLoaded(false);

        axios
        .post(learnCheckUrl, learn)
        .then(function (response) {
            let leftQuestions = learn.questions === null 
                || response.data.questions <= learn.questions
                ? '' : `${learn.questions} / `;

            setQuestions(`${leftQuestions}${response.data.questions} question(s)`);
            setLoaded(true);
        });
    }

    const learnCreate = () => {
        setLoaded(false);

        axios
        .post(learnUrl, learn)
        .then(function (response) {
            let link = Link_Session_Question(response.data.sessionId);
            navigate(link);
        });
    }

    const updateIterations = (event) => {
        const l = {...learn};
        l.iterations = Number(event.target.value);
        setLearn(l);
    }

    const updateVariants = (event) => {
        const l = {...learn};
        l.variants = Number(event.target.value);
        setLearn(l);
    }

    const updateQuestions = (event) => {
        const l = {...learn};
        l.questions = event.target.value !== all ? Number(event.target.value) : null;
        setLearn(l);
    }

    const updateTermType = (event) => {
        const l = {...learn};
        l.termType = event.target.value !== null ? Number(event.target.value) : null;
        setLearn(l);
    }

    const updateProgress = (event) => {
        const l = {...learn};
        l.progress = event.target.value !== null ? Number(event.target.value) : null;
        setLearn(l);
    }

    const updateLastRun = (event) => {
        const l = {...learn};
        l.lastRun = event.target.value !== all ? Number(event.target.value) : null;
        setLearn(l);
    }
    const updateLastFailed = (event) => {
        const l = {...learn};
        l.lastFailed = event.target.value !== all ? event.target.value == "true" : null;
        setLearn(l);
    }
    const updateSeverity = (event) => {
        const l = {...learn};
        l.severity = event.target.value !== all ? Number(event.target.value) : null;
        setLearn(l);
    }

    let buttons = [new TopButton('Learn', null, learnCreate)];

    let progressComponent = <div>
            <label>Progress</label>
            <select onChange={(event)=>(updateProgress(event))} 
                value={learn.progress === null ? all : learn.progress}>
                    <option value={all}>{all}</option>
                    <option value={1}>Less then 20%</option>
                    <option value={2}>From 20% to 40%</option>
                    <option value={3}>From 40% to 60%</option>
                    <option value={4}>From 60% to 80%</option>
                    <option value={5}>More then 80%</option>
                </select>
        </div>;

    let lastRunComponent = <div>
            <label>Last Run Date</label>
            <select onChange={(event)=>(updateLastRun(event))} 
                value={learn.lastRun === null ? all : learn.lastRun}>
                    <option value={all}>{all}</option>
                    <option value={1}>Over 1 day</option>
                    <option value={5}>Over 5 days</option>
                    <option value={10}>Over 10 days</option>
                    <option value={25}>Over 25 days</option>
                    <option value={50}>Over 50 days</option>
                    <option value={100}>Over 100 days</option>
                    <option value={0}>Never</option>
                </select>
        </div>;

    let questionsComponent = <div>
            <label>Questions</label>
            <select onChange={(event)=>(updateQuestions(event))} 
                    value={learn.questions === null ? all : learn.questions}>
                        <option>{all}</option>
                        <option>30</option>
                        <option>60</option>
                        <option>90</option>
                        <option>120</option>
                    </select>
        </div>;

    let lastFailedComponent = <div>
            <label>Last Run Result</label>
            <select onChange={(event)=>(updateLastFailed(event))} 
                    value={learn.lastFailed}>
                        <option value={all}>{all}</option>
                        <option value={true}>Failed</option>
                        <option value={false}>Succeeded</option>
                    </select>
        </div>;

    let severityComponent = <div>
            <label>Severity</label>
            <select onChange={(event)=>(updateSeverity(event))} 
                    value={learn.severity}>
                        <option value={all}>{all}</option>
                        <option value={1}>Easy</option>
                        <option value={0}>Medium</option>
                        <option value={2}>Hard</option>
                    </select>
        </div>;

    let iterationsComponent = <div>
            <label>Iterations</label>
            <select onChange={(event)=>(updateIterations(event))} 
                    value={learn.iterations}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
        </div>;

    let variantsComponent = <div>
            <label>Variants</label>
            <select onChange={(event)=>(updateVariants(event))} 
                    value={learn.variants}>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </select>
        </div>;

    let termTypeComponent = <div>
            <label>Term Type</label>
            <select onChange={(event)=>(updateTermType(event))} 
                    value={learn.termType === null ? "" : learn.termType}>
                        <option value={null}>Random</option>
                        <option value={0}>Left</option>
                        <option value={1}>Right</option>
                    </select>
        </div>

    let questionsText = <div>
            <p>Learn {questions}</p>
        </div>;

    return leaded === false ? <Loader /> : 
    <div>
        <TopButtons buttons={buttons}/>
        <div>
            <div className='inpts'>
                {progressComponent}
                {lastRunComponent}
                {lastFailedComponent}
                {severityComponent}
            </div>
            <div className='inpts'>
                {questionsComponent}
                {iterationsComponent}
                {variantsComponent}
                {termTypeComponent}
            </div>
            <div className='inpts'>
                {questionsText}
            </div>
        </div>
    </div>;
}

