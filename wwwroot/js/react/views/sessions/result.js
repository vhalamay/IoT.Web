import React from 'react';
import { useParams } from 'react-router-dom';

import QuestionAnswers from './_question-answers';

export default function SessionResultContent() {
    let { id } = useParams();

    return <QuestionAnswers sessionId={id} isResult={true} />;
}