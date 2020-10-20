import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios';
import Table from './betTable';


function Home(props) {
    // var email;
    useEffect(() => {
        axios.get('http://localhost:4000/user/me', { headers: { 'token': localStorage.getItem('token') }})
        .then(function (response) {
            if(response.status !== 200){
              redirectToLogin()
            }
            console.log(response.data);
            localStorage.setItem('email',response.data.email);
            let bettorid = response.data.bettorId;
            
            axios.post(`https://api.sharpsports.io/v1/bettors/${bettorid}/refreshbets`,{},{headers: { 'Authorization': 'Token 1fb886d9aff543cb6e2d87691a8b977abf12d312' }});
            console.log(bettorid);

            // axios.get('http://localhost:4000/user/bets', {headers: { 'token': localStorage.getItem('token') }})
            // .then(function (response) {
            //   // var bets = response.data;
            //   var bets = response.data;
            //   var betsArray = []
            //   var i;
            //   for (i=0;i<bets.length;i++) {
            //     // console.log(bets[i]);
            //     betsArray.push(bets[i])
            //   }
            //   console.log(betsArray)
            //   localStorage.setItem('bets',JSON.stringify(betsArray));
            // })
        })
        .catch(function (error) {
          redirectToLogin()
        });

      })
    function redirectToLogin() {
    props.history.push('/login');
    }

    const betsArray = [];
    
    const all_bets = axios.get('http://localhost:4000/user/bets', {headers: { 'token': localStorage.getItem('token') }})
    .then(function (response) {
      var bets = response.data;
      console.log(bets);
      // bets = response.data;
      var i;
      for (i=0;i<bets.length;i++) {
        // console.log(bets[i]);
        betsArray.push(bets[i])
      }
    });

    console.log(all_bets);
    const email = localStorage.getItem('email');
    console.log(email);

    // const mappedbets = all_bets.map((d) => {return <li key={d.contest}>{d.contest}</li>});

    console.log(Object.keys(all_bets));

    
    return (
      <div>
        <Helmet>
          <script src="https://d388bvybj12fcd.cloudfront.net/button.js"
            token = "1fb886d9aff543cb6e2d87691a8b977abf12d312"
            internalid = {String(email)}

            buttonText='BookLink'
            padding='15px 32px'
            background-color='#2b2c2e'
            border='none'
            color='#2ce384'
            text-align='center'
            text-decoration='none'
            display='inline-block'
            font-size='20px'
            border-radius='8px'
            font-family='Impact,Charcoal,sans-serif'
            logo-url='https://sample-app-logo.s3.amazonaws.com/sample-logo-final-small.png'
            defer>
          </script>
        </Helmet>
        <div id="SSLink" style={{top:"5%", left:"5%",position:"absolute"}}>
        </div>
        <div>
          {/* {mappedbets} */}
        </div>
      </div>

    );
}

export default withRouter(Home);