import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./links";

import Layout from "./views/layout";
import HomeContent from './views/home/home';
import LoginContent from './views/identity/login';

import SessionsContent from './views/sessions/sessions';
import SessionAnswerContent from './views/sessions/answer.js';
import SessionQuestionContent from './views/sessions/question.js';
import SessionResultContent from './views/sessions/result.js';

// Folders
import FoldersContent from './views/folders/folders';

import FolderCreateContent from './views/folders/create';
import FolderEditContent from './views/folders/edit';
import FolderCloneContent from './views/folders/clone';

import FolderSetsContent from './views/folders/sets';
import FolderSetCreateContent from './views/folders/set-create';

import FolderTermsContent from './views/folders/terms';
import FolderTermEditContent from './views/folders/term-edit';
import FolderTermSetsContent from './views/folders/term-sets';

import FolderTestsContent from './views/folders/tests';
import FolderTestEditContent from './views/folders/test-edit';

import FolderUsersContent from './views/folders/users';

import FolderLearnContent from './views/folders/learn';

// Sets
import SetsContent from './views/sets/sets';
import SetCreateContent from './views/sets/create';
import SetEditContent from './views/sets/edit';
import SetCloneContent from './views/sets/clone';
import SetLearnContent from './views/sets/learn.js';

import SetFoldersContent from './views/sets/folders';

import SetTermsContent from './views/sets/terms';
import SetTermCreateContent from './views/sets/term-create';
import SetTermEditContent from './views/sets/term-edit';
import SetTermCloneContent from './views/sets/term-clone';
import SetTermSetsContent from './views/sets/term-sets.js';

import SetTestsContent from './views/sets/tests';
import SetTestCreateContent from './views/sets/test-create';
import SetTestEditContent from './views/sets/test-edit';
import SetTestCloneContent from './views/sets/test-clone';

import * as Links from './links';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Layout/>}>
                    <Route index element={ <HomeContent/>} />
                    
                    <Route path={Links.Link_Identity_Login()} element={<LoginContent/>} />

                    <Route path={Links.Link_Sessions()}             element={<SessionsContent/>}/>
                    <Route path={Links.Link_Session_Answer()}       element={<SessionAnswerContent/>}/>
                    <Route path={Links.Link_Session_Question()}     element={<SessionQuestionContent/>}/>
                    <Route path={Links.Link_Session_Result()}       element={<SessionResultContent/>}/>


                    <Route path={Links.Link_Folders()}              element={<FoldersContent/>}/>
                    <Route path={Links.Link_Folder_Create()}        element={<FolderCreateContent/>}/>
                    <Route path={Links.Link_Folder_Edit()}          element={<FolderEditContent/>}/>
                    <Route path={Links.Link_Folder_Clone()}         element={<FolderCloneContent/>}/>

                    <Route path={Links.Link_Folder_Learn()}         element={<FolderLearnContent/>} />

                    <Route path={Links.Link_Folder_Sets()}          element={<FolderSetsContent/>} />
                    <Route path={Links.Link_Folder_Set_Create()}    element={<FolderSetCreateContent/>}/>

                    <Route path={Links.Link_Folder_Terms()}         element={<FolderTermsContent/>}/>
                    <Route path={Links.Link_Folder_Term_Edit()}     element={<FolderTermEditContent/>}/>
                    <Route path={Links.Link_Folder_Term_Sets()}     element={<FolderTermSetsContent/>}/>

                    <Route path={Links.Link_Folder_Tests()}         element={<FolderTestsContent/>}/>
                    <Route path={Links.Link_Folder_Test_Edit()}     element={<FolderTestEditContent/>}/>

                    <Route path={Links.Link_Folder_Users()}         element={<FolderUsersContent/>}/>


                    <Route path={Links.Link_Sets()}                 element={<SetsContent/>}/>
                    <Route path={Links.Link_Set_Create()}           element={<SetCreateContent/>}/>
                    <Route path={Links.Link_Set_Edit()}             element={<SetEditContent/>}/>
                    <Route path={Links.Link_Set_Clone()}            element={<SetCloneContent/>}/>

                    <Route path={Links.Link_Set_Learn()}            element={<SetLearnContent/>}/>

                    <Route path={Links.Link_Set_Folders()}          element={<SetFoldersContent/>}/>

                    <Route path={Links.Link_Set_Terms()}            element={<SetTermsContent/>}/>
                    <Route path={Links.Link_Set_Term_Create()}      element={<SetTermCreateContent/>}/>
                    <Route path={Links.Link_Set_Term_Edit()}        element={<SetTermEditContent/>}/>
                    <Route path={Links.Link_Set_Term_Clone()}       element={<SetTermCloneContent/>}/>
                    <Route path={Links.Link_Set_Term_Sets()}        element={<SetTermSetsContent/>}/>

                    <Route path={Links.Link_Set_Tests()}            element={<SetTestsContent/>}/>
                    <Route path={Links.Link_Set_Test_Create()}      element={<SetTestCreateContent/>}/>
                    <Route path={Links.Link_Set_Test_Edit()}        element={<SetTestEditContent/>}/>
                    <Route path={Links.Link_Set_Test_Clone()}       element={<SetTestCloneContent/>}/>

                    <Route path="*" element={ <Layout/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}