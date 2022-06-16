import React from "react";
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import Home from './component/Home';
import ReadMore from './component/ReadMore';
import MeetCat from './component/MeetCat';
import CreateCatAccount from './component/CreateCatAccount';
import Donate from './component/Donate';
import CreateDonation from './component/CreateDonation';
import EditDonation from './component/EditDonation';
import SignUp from './component/SignUp';
import Articles from './component/Articles';
import CreateArticle from './component/CreateArticle';
import Profile from './component/Profile';

import Login from "./component/Login";
import {Menu} from './component/Menu';

const App = () => {
    return (
      <>
     
      <BrowserRouter>
      <div>
        {/* <Menu/> */}
        <Switch>
          <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            {/* <Route path="/sign-up" component={SignUp} /> */}
          <Route path = "/home" component = {Home}/>
          {/* <Route path = "/cats" component = {MeetCat}/> */}
          <Route path="/cats" render={(props) => <MeetCat {...props} />} />;
          <Route path="/more" component = {ReadMore} />;
          <Route path="/cat" component = {CreateCatAccount} />;
          <Route path="/donations" render={(props) => <Donate {...props} />} />;
          {/* <Route path="/donate" component = {Donate} />; */}
          <Route path="/create_donation" component={CreateDonation}/>
          <Route path="/edit_donation" component={EditDonation}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/articles" component={Articles}/>
          <Route path="/create_article" component={CreateArticle}/>
          <Route path="/profile" component={Profile}/>
        </Switch>
        </div>
        
      </BrowserRouter>

      </>
    )
}

export default App;
