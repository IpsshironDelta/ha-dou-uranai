import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import MainPage from './components/MainPage/MainPage';
import KojinKantei from "./components/個人鑑定/個人鑑定"
import KojinKanteiEdit from "./components/個人鑑定編集/個人鑑定編集"
import KojinKekkaResult from "./components/個人鑑定結果表示/個人鑑定結果表示"
import Aisyou from "./components/相性診断/相性診断"
import AisyouEdit from "./components/相性鑑定編集/相性鑑定編集"
import AisyouResult from "./components/相性診断結果表示/相性診断結果表示"
import YearChart from "./components/年運表/年運表"
import YearChartEdit from "./components/年運表データ編集/年運表データ編集"
import MonthChart from "./components/月運表/月運表"
import MonthChartEdit from "./components/月運表データ編集/月運表データ編集"
import DayChart from "./components/日運表/日運表"
import DayChartEdit from "./components/日運表データ編集/日運表データ編集"
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import ProfileEdit from './components/ProfileEdit/ProfileEdit'
import PasswordReset from "./components/PasswordReset/PasswordReset"
import TEST from "./components/TEST/test"
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* ホーム画面 */}
        <Route exact path="/">
          <MainPage />
        </Route>

        {/* テスト画面
        <Route exact path="/test">
          <TEST />
        </Route> */}

        {/* サインアップ画面 */}
        <Route exact path="/signup">
          <SignUp />
        </Route>

        {/* ログイン画面 */}
        <Route exact path="/login">
          <Login />
        </Route>

        {/* パスワードリセット画面 */}
        <Route exact path="/passwordreset">
          <PasswordReset />
        </Route>

        {/* プロフィール編集画面 */}
          <Route exact path="/profile/edit">
          <ProfileEdit />
        </Route>

        {/* 個人鑑定入力画面 */}
        <Route exact path="/kojin">
          <KojinKantei />
        </Route>
        {/* 個人鑑定文章編集画面 */}
        <Route exact path="/kojin/edit">
          <KojinKanteiEdit />
        </Route>
        {/* 個人鑑定結果表示画面 */}
        <Route exact path="/kojin/result">
          <KojinKekkaResult />
        </Route>

        {/* 相性診断入力画面 */}
        <Route exact path="/aisyou">
          <Aisyou />
        </Route>
        {/* 相性診断編集画面 */}
        <Route exact path="/aisyou/edit">
          <AisyouEdit />
        </Route>
        {/* 相性診断結果表示画面 */}
        <Route exact path="/aisyou/result">
          <AisyouResult />
        </Route>

        {/* 年運表画面 */}
        <Route exact path="/yearchart">
          <YearChart />
        </Route>
        {/* 年運表編集画面 */}
        <Route exact path="/yearchart/edit">
          <YearChartEdit />
        </Route>

        {/* 月運表画面 */}
        <Route exact path="/monthchart">
          <MonthChart />
        </Route>
        {/* 月運表編集画面 */}
        <Route exact path="/monthchart/edit">
          <MonthChartEdit />
        </Route>

        {/* 日運表画面 */}
        <Route exact path="/daychart">
          <DayChart />
        </Route>
        {/* 日運表画面 */}
        <Route exact path="/daychart/edit">
          <DayChartEdit />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
