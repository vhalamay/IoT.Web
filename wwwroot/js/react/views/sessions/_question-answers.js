import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
    Link_Set_Terms,
    Link_Set_Tests,
    Link_Session_Question,
    Link_Session_Answer,
    Link_Session_Result,
    Api_Session_Info,
    Api_Session_Sets,
    Api_Session_Question,
    Api_Session_Answer,
    Api_Session_Answer_Order
} from '../../links';

import ProgressOrder from '../../shared/progress-order';
import Loader from '../../shared/loader';
import Severity from '../../shared/severity';
import Alias from '../../shared/alias';
import { SetTitle_Learn } from './../../titles';

export default function QuestionAnswers(props) {
    let navigate = useNavigate();

    let [sets, setSets] = useState([]);

    let [question, setQuestion] = useState('');
    let [questionSet, setQuestionSet] = useState(null);
    let [questionSetLink, setQuestionSetLink] = useState(null);
    let [questionTermType, setQuestionTermType] = useState(null);
    let [questionsCount, setQuestionsCount] = useState(0);

    let [failuresCount, setFailuresCount] = useState(0);
    let [successesCount, setSuccessesCount] = useState(0);
    let [currentOrder, setCurrentOrder] = useState(0);

    let [incorrectQuestion, setIncorrectQuestion] = useState('');
    let [correctAnswer, setCorrectAnswer] = useState('');

    let [answer, setAnswer] = useState('');
    let [answerOrder, setAnswerOrder] = useState(-1);

    let [questionPin, setQuestionPin] = useState(null);
    let [answerPin, setAnswerPin] = useState(null);

    let [isQuestion, setIsQuestion] = useState(props.isQuestion === true);
    let [isResult, setIsResult] = useState(props.isResult === true);

    let [variantsShown, setVariantsShown] = useState(false);

    let [sessionComplete, setSessionComplete] = useState(false);
    let [sessionInfoLoaded, setSessionInfoLoaded] = useState(false);
    let [sessionSetsLoaded, setSessionSetsLoaded] = useState(false);
    let [questionLoaded, setQuestionLoaded] = useState(false);
    let [answerQuestionLoaded, setAnswerQuestionLoaded] = useState(true);

    const getSessionInfo = () => {
        setSessionInfoLoaded(false);

        axios
            .get(Api_Session_Info(props.sessionId))
            .then(function (response) {
                setQuestionsCount(response.data.questions);
                setFailuresCount(response.data.failures);
                setSessionInfoLoaded(true);

                getSessionSets();
            })
    };

    const getSessionSets = () => {
        setSessionSetsLoaded(false);

        axios
            .get(Api_Session_Sets(props.sessionId))
            .then(function (response) {
                setSets(response.data);
                setSessionSetsLoaded(true);
                if (isQuestion === true) {
                    getQuestion();
                } else {
                    setAnswerOrder(1);
                }
            })
    };

    const getQuestion = () => {
        setQuestionLoaded(false);

        axios
            .get(Api_Session_Question(props.sessionId))
            .then(function (response) {
                setQuestion(response.data);
                setQuestionTermType(response.data.termType);
                setQuestionLoaded(true);
            })
    };

    const getAnswer = () => {
        setQuestionLoaded(false);

        let answerUrl = isResult === true 
            ? Api_Session_Answer_Order(props.sessionId, answerOrder) 
            : Api_Session_Answer(props.sessionId);

        axios
            .get(answerUrl)
            .then(function (response) {
                setQuestion(response.data);
                setAnswer(response.data.variants[0]);
                setCorrectAnswer(response.data.correct);
                setIncorrectQuestion(response.data.incorrect);
                setQuestionLoaded(true);
            })
    };

    const answerQuestion = (variantId) => {
        setAnswerQuestionLoaded(false);

        axios
            .post(Api_Session_Answer(props.sessionId), { variantId: variantId })
            .then(function (response) {
                if (variantId === response.data.correct.id) {
                    getQuestion();
                } else {
                    var correctVariant = question.variants.find(x => x.id === response.data.correct.id);
                    setCorrectAnswer(correctVariant);
                    setIncorrectQuestion(response.data.incorrect);

                    setIsQuestion(false);
                    window.history.pushState({}, questionSet.name, Link_Session_Answer(props.sessionId));
                }
                setAnswerQuestionLoaded(true);
            });

        var answeredVariant = question.variants.find(x => x.id === variantId);
        setAnswer(answeredVariant);
    }

    const answerCorrectQuestion = () => {
        if(isResult !== true) {
            setIsQuestion(true);
            getQuestion();
            setFailuresCount(failuresCount + 1);
            window.history.pushState({}, questionSet.name, Link_Session_Question(props.sessionId));
        }
    }

    const answerIncorrectQuestion = () => {
        // fix onClick console error
    }

    const setPins = () => {
        if (questionTermType === 0) {
            setQuestionPin(questionSet.left);
            setAnswerPin(questionSet.right);
        } else if (questionTermType === 1) {
            setQuestionPin(questionSet.right);
            setAnswerPin(questionSet.left);
        } else {
            setQuestionPin(null);
            setAnswerPin(null);
        }
    };

    const goToFirstAnswer = () => {
        setAnswerOrder(1);
    }

    const goToNextAnswer = () => {
        let nextOrder = answerOrder + 1;
        if(nextOrder <= questionsCount) {
            setAnswerOrder(nextOrder);
        }
    }

    const goToPrevAnswer = () => {
        let prevOrder = answerOrder - 1;
        if(prevOrder > 0) {
            setAnswerOrder(prevOrder);
        }
    }

    const goToLastAnswer = () => {
        setAnswerOrder(questionsCount);
    }

    useEffect(() => {
        getSessionInfo();
    }, []);

    useEffect(() => {
        let complete = question.order === questionsCount && question.id === undefined;
        if (complete === false) {
            let currentSet = sets.find(s => s.id === question.setId);
            if(currentSet !== undefined) {
                setQuestionSet(currentSet);

                let setLink = currentSet.type === 0
                    ? Link_Set_Terms(question.setId) 
                    : Link_Set_Tests(question.setId);

                setQuestionSetLink(setLink);
            }
        } else {
            setSessionComplete(true);
            let link = Link_Session_Result(props.sessionId);
            navigate(link);
        }

        if(isResult === true)
        { 
            setCurrentOrder(question.order);
            setSuccessesCount(questionsCount - failuresCount)
        }
        else
        {
            setCurrentOrder(question.order - 1);
            setSuccessesCount(question.order - failuresCount - 1);
        }
    }, [question]);

    useEffect(() => {
        setPins();
        if (questionSet !== null && questionSet !== undefined){
            setVariantsShown(questionSet.type === 1);
            SetTitle_Learn(questionSet.name);
        }
    }, [questionSet]);

    useEffect(() => {
        setPins();
    }, [questionTermType]);

    useEffect(() => {
        if(answerOrder !== -1) {
            getAnswer();
        }
    }, [answerOrder]);

    let resultContent = 
        <div className='result'>
            <button onClick={goToFirstAnswer} className='prev' type="button">first</button>
            <button onClick={goToPrevAnswer} className='prev' type="button">prev</button>
            <button onClick={goToLastAnswer} className='next' type="button">last</button>
            <button onClick={goToNextAnswer} className='next' type="button">next</button>
        </div>;

    let answerContent =
        <div>
            <QuestionVariants
                question={question}
                variants={[correctAnswer]}
                variantClassName={'correct variant'}
                questionPin={questionPin}
                variantPin={answerPin}
                variantsShown={true}
                onClick={answerCorrectQuestion} />
            <QuestionVariants
                question={incorrectQuestion}
                variants={[answer]}
                variantClassName={'incorrect variant'}
                questionPin={questionPin}
                variantPin={answerPin}
                variantsShown={true}
                onClick={answerIncorrectQuestion} />
        </div>

    return sessionComplete === true
        || sessionInfoLoaded === false
        || sessionSetsLoaded === false
        || questionLoaded === false
        || answerQuestionLoaded === false ? <Loader /> :
        <div className='session-question'>
            {isResult === true && resultContent}
            <ProgressOrder  scs={successesCount} 
                            flr={failuresCount} 
                            crt={currentOrder} 
                            qty={questionsCount}/>
            <div className='bdgs'>
                <Severity severity={question.severity}/>  
                <Alias alias={question.alias}/>  
            </div>
            <a className="set" href={questionSetLink} target="_blank">{questionSet.name}</a>
            {isQuestion === true &&
                <QuestionVariants
                    question={question}
                    variants={question.variants}
                    variantClassName={'variant'}
                    questionPin={questionPin}
                    variantPin={answerPin}
                    variantsShown={variantsShown}
                    onClick={answerQuestion} />}  
            {isQuestion === false && answerContent}
        </div>;
}

function Variant(props) {
    return <a className={props.className} onClick={() => (props.onClick(props.id))}>
        {props.pin && <span className='pin'>{props.pin}</span>}
        <span className='content' dangerouslySetInnerHTML={{ __html: props.content }} />
        {props.notes && <span className="notes" dangerouslySetInnerHTML={{ __html: props.notes }} />}
    </a>;
}

function Question(props) {
    return  <a className="question" onClick={() => (props.onClick())}>
                {props.pin && <span className="pin">{props.pin}</span>}
                <span className="content" dangerouslySetInnerHTML={{ __html: props.content }} />
                {props.notes && <span className="notes" dangerouslySetInnerHTML={{ __html: props.notes }} />}
            </a>;
}

function QuestionVariants(props) {
    if(props.variants[0] === undefined)
        return null;

    let [variantsShown, setVariantsShown] = useState(props.variantsShown === true);

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [variantsShown]);

    const variants = props.variants
        ? props.variants.map((variant, index) =>
            <Variant key={index}
                id={variant.id}
                className={props.variantClassName}
                content={variant.content}
                notes={variant.notes}
                pin={props.variantPin}
                onClick={props.onClick} />)
        : null;

    const showVariants = () => {
        if(variantsShown === false) {
            setVariantsShown(true);
        }
    }

    return <div className='question-with-variants'>
                <div className='questions'>
                    {props.question !== undefined && props.question.content !== undefined &&
                        <Question
                            pin={props.questionPin}
                            content={props.question.content}
                            notes={props.question.notes} 
                            onClick={showVariants}/>}
                </div>
                {variantsShown && <div className='variants'>{variants}</div>}
            </div>;
}